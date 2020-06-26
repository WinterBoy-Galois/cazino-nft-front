import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { from } from 'apollo-link';
import introspectionQueryResultData from './fragmentTypes.json';

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

const link = from([wsLink]);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});

export default client;
