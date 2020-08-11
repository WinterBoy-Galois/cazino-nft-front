import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';
import { LocationProvider } from '@reach/router';

describe('HomePage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <HomePage />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
