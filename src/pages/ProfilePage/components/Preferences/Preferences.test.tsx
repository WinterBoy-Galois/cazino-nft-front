import React from 'react';
import { render } from '@testing-library/react';
import Preferences from '.';
import { LocationProvider } from '@reach/router';

describe('Preferences', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <Preferences />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
