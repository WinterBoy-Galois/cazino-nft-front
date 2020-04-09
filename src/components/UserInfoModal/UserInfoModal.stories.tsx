import React from 'react';
import { storiesOf } from '@storybook/react';
import UserInfoModal from '.';
import { createMockClient } from 'mock-apollo-client';
import { USER_INFO } from '../../graphql/queries';
import { ApolloProvider } from '@apollo/react-hooks';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';

// https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  addTypename: false,
  fragmentMatcher,
});

const mockClient = createMockClient({ cache });
mockClient.setRequestHandler(USER_INFO, () =>
  Promise.resolve({
    data: {
      userInfo: {
        __typename: 'PublicUser',
        id: '1',
        username: 'AuYHKS',
        avatarUrl: 'https://dev.gambilife.com/ava/m2.svg',
        totalWager: 0,
        totalProfit: 0,
        mostPlayed: 'CLAMS',
        totalBets: 0,
        luckyBets: 0,
      },
    },
  })
);

const loadingMockClient = createMockClient();
loadingMockClient.setRequestHandler(USER_INFO, () => new Promise(() => null));

const emptyMockClient = createMockClient({ cache });
emptyMockClient.setRequestHandler(USER_INFO, () => Promise.resolve({ data: { userInfo: {} } }));

const errorMockClient = createMockClient();
errorMockClient.setRequestHandler(USER_INFO, () => Promise.reject());

storiesOf('Components/UserInfoModal', module)
  .add('default', () => (
    <ApolloProvider client={mockClient}>
      <UserInfoModal show={true} userId="1" />
    </ApolloProvider>
  ))
  .add('User not found', () => (
    <ApolloProvider client={emptyMockClient}>
      <UserInfoModal show={true} userId="1" />
    </ApolloProvider>
  ))
  .add('loading', () => (
    <ApolloProvider client={loadingMockClient}>
      <UserInfoModal show={true} userId="1" />
    </ApolloProvider>
  ))
  .add('error', () => (
    <ApolloProvider client={errorMockClient}>
      <UserInfoModal show={true} userId="1" />
    </ApolloProvider>
  ));
