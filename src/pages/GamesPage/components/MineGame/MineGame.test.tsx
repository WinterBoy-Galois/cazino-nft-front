import React from 'react';
import { render } from '@testing-library/react';

import MineGame from '.';
import { LocationProvider } from '@reach/router';

describe('MineGame', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <MineGame />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
