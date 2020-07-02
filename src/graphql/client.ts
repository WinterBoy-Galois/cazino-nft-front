import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { from, split } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import introspectionQueryResultData from './fragmentTypes.json';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import jwtDecode from 'jwt-decode';
import { getEpoch } from '../common/util/date.util';
import { setContext } from 'apollo-link-context';
import { clearAccessToken } from '../common/util/storage.util';

// https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: true,
  fragmentMatcher,
});

const getApolloClient = (
  onAccessTokenRefresh: (accessToken: string) => void,
  accessToken?: string
) => {
  const wsLink = new WebSocketLink({
    uri: `wss://staging.jinglebets.com/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: accessToken,
      },
    },
  });

  const httpLink = new HttpLink({
    uri: 'https://staging.jinglebets.com/graphql',
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
      }

      return true;
    },
    fetchAccessToken: () => {
      return fetch('https://staging.jinglebets.com/refresh_tokens', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
    },
    handleFetch: accessToken => onAccessTokenRefresh(accessToken),
    handleError: () => clearAccessToken(),
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        (definition.operation === 'subscription' || definition.operation === 'query')
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    cache,
    link: from([tokenLink, link]),
  });
};

export default getApolloClient;
