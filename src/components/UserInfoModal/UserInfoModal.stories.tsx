import React from 'react';
import { storiesOf } from '@storybook/react';
import UserInfoModal from '.';
import { createMockClient } from 'mock-apollo-client';
import { USER_INFO } from '../../graphql/queries';
import { ApolloProvider } from '@apollo/react-hooks';

const mockClient = createMockClient();
mockClient.setRequestHandler(USER_INFO, () =>
  Promise.resolve({
    data: {
      userInfo: {
        id: '1',
        username: 'NIDHjQ',
        avatarUrl: 'https://dev.gambilife.com/ava/m1.svg',
        totalWager: 0,
        totalProfit: 0,
        mostPlayed: 'DICE',
        totalBets: 0,
        luckyBets: 0,
      },
    },
  })
);

const loadingMockClient = createMockClient();
loadingMockClient.setRequestHandler(USER_INFO, () => new Promise(() => null));

const emptyMockClient = createMockClient();
emptyMockClient.setRequestHandler(USER_INFO, () => Promise.resolve({ data: {} }));

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
