import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';

describe('App', () => {
  xit('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );

    wait();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
