import React from 'react';
import { render, wait, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import UserInfoModal from './UserInfoModal';
import { USER_INFO } from '../../graphql/queries';

describe('LeaderboardsTab', () => {
  it('should match snapshot', async () => {
    // Arrange
    const mockClient = createMockClient();
    const queryHandler = jest.fn().mockResolvedValue({
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
    });
    mockClient.setRequestHandler(USER_INFO, queryHandler);

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <UserInfoModal show={true} userId="1" />
      </ApolloProvider>
    );

    await act(wait);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
