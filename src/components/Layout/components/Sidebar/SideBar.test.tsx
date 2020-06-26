import React from 'react';
import { render, wait, act } from '@testing-library/react';
import SideBar from './SideBar';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { BET_ADDED } from '../../../../graphql/subscriptions';

describe('SideBar', () => {
  it('should match snapshot', async () => {
    // Arrange
    const mockClient = createMockClient();
    const queryHandler = jest.fn().mockResolvedValue({
      data: {
        betAdded: {
          id: '155689',
          time: 1589971668258,
          userid: 59,
          username: 'pamela56',
          gameid: 'CLAMS',
          bet: 0.00001028,
          profit: -0.00001028,
          multiplier: 0,
        },
      },
    });
    mockClient.setRequestHandler(BET_ADDED, queryHandler);

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <SideBar />
      </ApolloProvider>
    );

    await act(wait);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
