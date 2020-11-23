import React from 'react';
import { render } from '@testing-library/react';

import DiceGame from '.';
import { LocationProvider } from '@reach/router';

describe('DiceGame', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <DiceGame />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
