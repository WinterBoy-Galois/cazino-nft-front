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
      authToken: localStorage.getItem('accessToken') ?? undefined,
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

let isRefreshing = false;
let pendingRequests: any[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map(callback => {
    return callback();
  });
  pendingRequests = [];
};

let request: any;

const getNewToken = () => {
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
  const accessToken = localStorage.getItem('accessToken');
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
  attempts: (count, operation, error) => {
    return !!error;
  },
  delay: () => 500,
});

export const useApolloClient = (logout: any) => {
  const errorLink = onError(({ graphQLErrors, operation, forward, networkError, response }) => {
    console.log('what?', operation);
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
                    localStorage.setItem('accessToken', accessToken);
                    resolvePendingRequests();
                    return accessToken;
                  })
                  .catch(() => {
                    logout?.();
                    console.log('logout here');
                    return forward(operation);
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter(value => Boolean(value));
            } else {
              // Will only emit once the Promise is resolved
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
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
      if (networkError) {
        if (networkError && 'statusCode' in networkError && networkError.statusCode === 503) {
          error(networkError.message);
          if (response) {
            response.errors = undefined;
          }
        }
        console.log('Error--------------------', networkError);
      }
    }
  });

  const apolloLink = from([errorLink, retryLink, link]);

  return new ApolloClient({
    cache,
    link: apolloLink,
    queryDeduplication: false,
  });
};
