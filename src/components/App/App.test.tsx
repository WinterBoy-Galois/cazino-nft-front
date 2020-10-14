import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';

describe('App', () => {
  xit('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );

    // Assert
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
