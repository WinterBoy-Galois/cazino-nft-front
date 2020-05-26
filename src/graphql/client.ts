import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
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

const httpLink = new HttpLink({
  uri: 'https://staging.gambilife.com/graphql/',
});

const wsLink = new WebSocketLink({
  uri: `wss://staging.gambilife.com/graphql`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      (definition.operation === 'subscription' ||
        definition.operation === 'query' ||
        definition.operation === 'mutation')
    );
  },
  wsLink,
  httpLink
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});

export default client;
