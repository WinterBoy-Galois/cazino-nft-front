import {
  ApolloClient,
  defaultDataIdFromObject,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  Operation,
  split,
} from '@apollo/client';
import possibleTypes from './possibleTypes.json';
import { WebSocketLink } from '@apollo/client/link/ws';
import { appConfig } from '../common/config';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { error } from '../components/Toast';
import { GraphQLError } from 'graphql';
import { RetryLink } from '@apollo/client/link/retry';
import { getAccessToken, setAccessToken } from '../user/UserProvider';

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

const wsLink = new WebSocketLink({
  uri: `${appConfig.apiBasePathWS}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: getAccessToken() ?? undefined,
    },
  },
});

const httpLink = new HttpLink({
  uri: `${appConfig.apiBasePath}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
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

let isRefreshing = false;
let pendingRequests: any[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map(callback => {
    return callback();
  });
  pendingRequests = [];
};

let request: any;

export const getNewToken = () => {
  if (!request) {
    request = fetch(`${appConfig.apiBasePath}/refresh_tokens`, {
      method: 'POST',
      credentials: 'include',
    });
  }
  return request
    .then((result: any) => {
      if (!result.ok) {
        throw new GraphQLError(`${result.status}: ${result.statusText}`);
      }
      return result.json();
    })
    .finally(() => {
      request = null;
    });
};

const newOperation = (operation: Operation) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        ...operation.getContext().headers,
        authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return operation;
};

const retryLink = new RetryLink({
  attempts: {
    retryIf: error => !!error,
    max: 5,
  },
  delay: () => 1000,
});

export const useApolloClient = (logout: any) => {
  const errorLink = onError(({ graphQLErrors, operation, forward, networkError, response }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err?.extensions?.code) {
          case 'FORBIDDEN':
            let forward$;

            if (!isRefreshing && operation.operationName !== 'SignOut') {
              isRefreshing = true;
              forward$ = fromPromise(
                getNewToken()
                  .then(({ accessToken }: any) => {
                    setAccessToken(accessToken);
                    resolvePendingRequests();
                    return accessToken;
                  })
                  .catch(() => {
                    logout?.();
                    return forward(operation);
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter(value => Boolean(value));
            } else {
              forward$ = fromPromise(
                new Promise(resolve => {
                  pendingRequests.push(() => resolve());
                })
              );
            }
            return forward$.flatMap(() => {
              return forward(newOperation(operation));
            });
        }
      }
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
      if (networkError) {
        if (networkError && 'statusCode' in networkError && networkError.statusCode === 503) {
          error(networkError.message);
          if (response) {
            response.errors = undefined;
          }
        }
        // eslint-disable-next-line no-console
        console.log('Error--------------------', networkError);
      }
    }
  });

  const apolloLink = from([errorLink, retryLink, link]);

  return new ApolloClient({
    cache,
    link: apolloLink,
    queryDeduplication: false,
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
};
