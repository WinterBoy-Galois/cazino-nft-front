import React from 'react';
import { render } from '@testing-library/react';

import Referrals from '.';
import { LocationProvider } from '@reach/router';

describe('Referrals', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <Referrals />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
