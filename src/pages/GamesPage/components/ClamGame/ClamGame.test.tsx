import React from 'react';
import { render } from '@testing-library/react';

import ClamGame from '.';
import { LocationProvider } from '@reach/router';

describe('ClamGame', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <ClamGame />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
