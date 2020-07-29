import React from 'react';
import { render } from '@testing-library/react';
import BetDetailsModal from '.';
import { LocationProvider } from '@reach/router';

describe('BetDetailsModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <BetDetailsModal show={true} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
