import React from 'react';
import { render } from '@testing-library/react';
import Bets from '.';
import { LocationProvider } from '@reach/router';

describe('Bets', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    render(
      <LocationProvider>
        <Bets bets={[]} />
      </LocationProvider>
    );

    // Assert
    // expect(container).toMatchSnapshot();
  });
});
