import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const cache = new InMemoryCache({ dataIdFromObject: o => o.id, addTypename: true });
const httpLink = new HttpLink({
  uri: 'https://dev.gambilife.com/graphql/',
});

const wsLink = new WebSocketLink({
  uri: `wss://dev.gambilife.com/graphql`,
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
