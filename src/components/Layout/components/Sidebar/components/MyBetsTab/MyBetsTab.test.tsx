import React from 'react';
import { render, wait, act } from '@testing-library/react';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import MyBetsTab from '.';
import { BET_ADDED } from '../../../../../../graphql/subscriptions';

describe('MyBetsTab', () => {
  it('should match snapshot', async () => {
    // Arrange
    const mockClient = createMockClient();
    const queryHandler = jest.fn().mockResolvedValue({ data: { betAdded: {} } });
    mockClient.setRequestHandler(BET_ADDED, queryHandler);

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <MyBetsTab />
      </ApolloProvider>
    );

    await act(wait);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
