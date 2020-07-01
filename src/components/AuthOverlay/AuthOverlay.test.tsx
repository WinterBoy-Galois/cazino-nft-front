import React from 'react';
import { render, wait } from '@testing-library/react';
import AuthOverlay from './AuthOverlay';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

describe('AuthOverlay', () => {
  it('should match snapshot', () => {
    // Arrange
    const mockClient = createMockClient();

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <AuthOverlay>Test</AuthOverlay>
      </ApolloProvider>
    );

    wait();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
