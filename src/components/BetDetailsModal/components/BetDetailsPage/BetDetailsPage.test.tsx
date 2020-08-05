import React from 'react';
import { render } from '@testing-library/react';
import BetDetailsPage from '.';
import { LocationProvider } from '@reach/router';

describe('BetDetailsPage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <BetDetailsPage />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
