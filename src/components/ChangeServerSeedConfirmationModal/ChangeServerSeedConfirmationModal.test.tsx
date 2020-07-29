import React from 'react';
import { render } from '@testing-library/react';
import ChangeServerSeedConfirmationModal from '.';
import { LocationProvider } from '@reach/router';

describe('LeaderboardsTab', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <ChangeServerSeedConfirmationModal show={true} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
