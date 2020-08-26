import React from 'react';
import { storiesOf } from '@storybook/react';
import SideBar from '.';
import { ApolloProvider } from '@apollo/react-hooks';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { createMockClient } from 'mock-apollo-client';
import { BET_ADDED } from '../../../../graphql/subscriptions';
import introspectionQueryResultData from '../../../../graphql/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
const cache = new InMemoryCache({
  addTypename: false,
  fragmentMatcher,
});

const mockClient = createMockClient({ cache });
const queryHandler = () =>
  Promise.resolve({
    data: {
      betAdded: {
        id: '155689',
        time: 1589971668258,
        userid: 59,
        username: 'pamela56',
        gameid: 'CLAMS',
        bet: 0.00001028,
        profit: -0.00001028,
        multiplier: 1.45,
      },
    },
  });
mockClient.setRequestHandler(BET_ADDED, queryHandler);

storiesOf('Components/SideBar', module)
  .addDecorator(storyFn => <ApolloProvider client={mockClient}>{storyFn()}</ApolloProvider>)
  .add('default', () => <SideBar />);
