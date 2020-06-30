import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { from, split } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import introspectionQueryResultData from './fragmentTypes.json';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import jwtDecode from 'jwt-decode';
import { getEpoch } from '../common/util/date.util';

// https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: true,
  fragmentMatcher,
});

const wsLink = new WebSocketLink({
  uri: `wss://staging.jinglebets.com/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('accessToken'),
    },
  },
});

const httpLink = new HttpLink({
  uri: 'https://staging.jinglebets.com/graphql',
  // credentials: 'include',
});

const tokenLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => {
    const accessToken = localStorage.getItem('accessToken');

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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });
  },
  handleFetch: accessToken => localStorage.setItem('accessToken', accessToken),
  // handleResponse: (operation, accessTokenField) => (response: Response) => {
  // here you can parse response, handle errors, prepare returned token to
  // further operations
  // returned object should be like this:
  // {
  //    access_token: 'token string here'
  // }
  // },
  // handleError: err => {
  //   // full control over handling token fetch Error
  //   console.warn('Your refresh token is invalid. Try to relogin');
  //   console.error(err);
  // },
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
  httpLink
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([tokenLink, link]),
});

export default client;
