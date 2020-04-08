import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';
import { ApolloProvider } from '@apollo/react-hooks';
import { USER_INFO } from '../../graphql/queries';
import { createMockClient } from 'mock-apollo-client';

describe('Layout', () => {
  it('should match snapshot', () => {
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
        <Layout />
      </ApolloProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
