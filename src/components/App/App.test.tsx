import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';

describe('App', () => {
  it('should match snapshot', () => {
    // Arrange
    const mockClient = createMockClient();

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <App />
      </ApolloProvider>
    );

    wait();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
