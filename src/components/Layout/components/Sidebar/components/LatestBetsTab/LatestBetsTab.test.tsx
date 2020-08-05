import React from 'react';
import { render } from '@testing-library/react';
import LatestBetsTab from '.';
import { LocationProvider } from '@reach/router';

describe('LatestBetsTab', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <LatestBetsTab />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
