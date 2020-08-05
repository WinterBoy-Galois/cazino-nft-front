import React from 'react';
import { render, wait, act } from '@testing-library/react';
import Layout from './Layout';
import { ApolloProvider } from '@apollo/react-hooks';
import { USER_INFO, USER_INFO_AVATAR_URL } from '../../graphql/queries';
import { createMockClient } from 'mock-apollo-client';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { BET_ADDED } from '../../graphql/subscriptions';
import { LocationProvider } from '@reach/router';

describe('Layout', () => {
  it('should match snapshot', async () => {
    // Arrange
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    });
    const cache = new InMemoryCache({
      addTypename: false,
      fragmentMatcher,
    });

    const mockClient = createMockClient({ cache });
    const queryHandler = jest.fn().mockResolvedValue({
      data: {
        userInfo: {
          __typename: 'PublicUser',
          id: '1',
          username: 'NIDHjQ',
          avatarUrl: 'https://dev.gambilife.com/ava/m1.svg',
          totalWager: 0,
          totalProfit: 0,
          mostPlayed: 'DICE',
          totalBets: 0,
          luckyBets: 0,
        },
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
    mockClient.setRequestHandler(USER_INFO, queryHandler);
    mockClient.setRequestHandler(USER_INFO_AVATAR_URL, queryHandler);
    mockClient.setRequestHandler(BET_ADDED, queryHandler);

    // Act
    const container = render(
      <LocationProvider>
        <ApolloProvider client={mockClient}>
          <Layout />
        </ApolloProvider>
      </LocationProvider>
    );

    await act(wait);

    // Assert
    expect(container).toMatchSnapshot();

    await wait();
  });
});
