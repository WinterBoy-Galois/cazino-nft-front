import React from 'react';
import { render } from '@testing-library/react';

import Bonuses from '.';
import { LocationProvider } from '@reach/router';

describe('Bonuses', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <Bonuses />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
