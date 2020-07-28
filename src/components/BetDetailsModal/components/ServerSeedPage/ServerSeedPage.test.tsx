import React from 'react';
import { render } from '@testing-library/react';
import ServerSeedPage from '.';
import { LocationProvider } from '@reach/router';

describe('BetDetailsPage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <ServerSeedPage loading={false} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
