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
  },
});

const httpLink = new HttpLink({
  uri: 'https://staging.jinglebets.com/graphql',
});

const tokenLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => {
    return true;
  },
  fetchAccessToken: () => {
    return fetch('https://staging.jinglebets.com/refresh_tokens', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAxLCJzYWx0IjoiNzU0NTRhNDEtNmEwYy00MTUwLTg1M2YtMDM5OTJmNzRlNTMwIiwiaWF0IjoxNTkzNDk3NTQwLCJleHAiOjE1OTYwODk1NDB9.C31dupakcPX-HwKu7e2s8W3PDaKvxkmUkAR05BpYzJk',
      },
    });
  },
  handleFetch: accessToken => accessToken,
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
