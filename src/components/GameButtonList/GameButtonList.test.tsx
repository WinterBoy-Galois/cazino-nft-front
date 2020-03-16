import React from 'react';
import { render } from '@testing-library/react';
import GameButtons from './GameButtonList';
import { LocationProvider } from '@reach/router';

describe('GameButtonList', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <GameButtons />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
