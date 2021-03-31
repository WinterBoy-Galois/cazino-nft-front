import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import possibleTypes from './possibleTypes.json';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink, defaultDataIdFromObject } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { getEpoch } from '../common/util/date.util';
import { setContext } from '@apollo/client/link/context';
import { AuthType } from '../state/models/auth.model';
import { appConfig } from '../common/config';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      default:
        return defaultDataIdFromObject(responseObject);
    }
  },
  addTypename: true,
  possibleTypes,
});

let wsLink: WebSocketLink;

const getApolloClient = (
  onAccessTokenRefresh: (accessToken: string) => void,
  onSignOut: () => void,
  authType: AuthType,
  accessToken?: string
) => {
  cache.reset();

  if (wsLink) {
    (wsLink as any).subscriptionClient.close();
  }

  wsLink = new WebSocketLink({
    uri: `${appConfig.apiBasePathWS}/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: accessToken ?? undefined,
      },
    },
  });

  const httpLink = new HttpLink({
    uri: `${appConfig.apiBasePath}/graphql`,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    if (accessToken) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`,
        },
      };
    }

    return headers;
  });

  const tokenLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      if (accessToken) {
        const { exp } = jwtDecode(accessToken);

        if (exp < getEpoch()) {
          return false;
        }
      } else if (authType === 'SIGNED_IN') {
        return false;
      }

      return true;
    },
    fetchAccessToken: () => {
      return fetch(`${appConfig.apiBasePath}/refresh_tokens`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    handleFetch: accessToken => onAccessTokenRefresh(accessToken),
    handleError: () => onSignOut(),
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err?.extensions?.code) {
          case 'FORBIDDEN':
            // error code is set to FORBIDDEN
            // when AuthenticationError thrown in resolver

            // if new accesstoken is valid
            // retry request with it
            if (accessToken) {
              const { exp } = jwtDecode(accessToken);
              if (exp > getEpoch()) {
                // modify the operation context with a new token
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: accessToken,
                  },
                });
                // retry the request, returning the new observable
                return forward(operation);
              }
            }
        }
      }
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 10,
      retryIf: error => !!error,
    },
  });

  return new ApolloClient({
    cache,
    link: from([errorLink, tokenLink, link, retryLink]),
  });
};

export default getApolloClient;
