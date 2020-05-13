import React from 'react';
import { render, wait, act } from '@testing-library/react';
import LatestBetsTab from '.';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { LEADERBOARDS_SUBSCRIPTION } from '../../../../../../graphql/subscriptions';

describe('LatestBetsTab', () => {
  it('should match snapshot', async () => {
    // Arrange
    const mockClient = createMockClient();
    const queryHandler = jest
      .fn()
      .mockResolvedValue({ data: { leaderboardChanged: { daily: [], weekly: [], monthly: [] } } });
    mockClient.setRequestHandler(LEADERBOARDS_SUBSCRIPTION, queryHandler);

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <LatestBetsTab />
      </ApolloProvider>
    );

    await act(wait);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
