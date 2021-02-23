import React from 'react';
import { render } from '@testing-library/react';

import UnClaimedBonuses from '.';
import { LocationProvider } from '@reach/router';

describe('UnClaimedBonuses', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <UnClaimedBonuses />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
