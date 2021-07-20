import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import possibleTypes from './possibleTypes.json';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink, defaultDataIdFromObject } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { getEpoch } from '../common/util/date.util';
import { setContext } from '@apollo/client/link/context';
import { appConfig } from '../common/config';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { error } from '../components/Toast';
import { fromPromise } from '@apollo/client';

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

let isRefreshing = false;
let pendingRequests: any[] = [];

const resolvePendingRequests = () => {
  console.log('resolve');
  pendingRequests.map(callback => {
    console.log(callback);
    return callback();
  });
  pendingRequests = [];
};

const getNewToken = () => {
  console.log('get new token');
  return fetch(`${appConfig.apiBasePath}/refresh_tokens`, {
    method: 'POST',
    credentials: 'include',
  }).then(result => result.json());
};

const getApolloClient = (
  onAccessTokenRefresh: (accessToken: string) => void,
  onSignOut: () => void,
  isAuthorized: boolean,
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
    const accessToken = localStorage.getItem('accessToken');
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

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const isTokenValidOrUndefined = () => {
    if (accessToken) {
      const { exp } = jwtDecode(accessToken);

      if (exp < getEpoch()) {
        return true;
      }
    } else if (isAuthorized) {
      return true;
    }

    return false;
  };

  const errorLink = onError(({ graphQLErrors, operation, forward, networkError, response }) => {
    if (!accessToken) {
      return;
    }
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.log('err', err);
        switch (err?.extensions?.code) {
          case 'FORBIDDEN':
            console.log('forbidden');
            let forward$;

            if (!isRefreshing && isTokenValidOrUndefined()) {
              console.log('is refreshing');
              isRefreshing = true;
              forward$ = fromPromise(
                getNewToken()
                  .then(({ accessToken }) => {
                    onAccessTokenRefresh(accessToken);
                    console.log('get new token', accessToken);
                    resolvePendingRequests();
                    return accessToken;
                  })
                  .catch(() => {
                    pendingRequests = [];
                    onSignOut();
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter(value => Boolean(value));
            }
            // Will only emit once the Promise is resolved
            forward$ = fromPromise(
              new Promise(resolve => {
                pendingRequests.push(() => resolve());
              })
            );

            return forward$.flatMap(() => forward(operation));
        }
      }
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      if (networkError && 'statusCode' in networkError && networkError.statusCode === 503) {
        error(networkError.message);
        if (response) {
          response.errors = undefined;
        }
      }
      console.log('Error--------------------', networkError);
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
    link: from([errorLink, link, retryLink]),
  });
};

export default getApolloClient;
