import React from 'react';
import { render } from '@testing-library/react';

import MyBetsTab from '.';
import { LocationProvider } from '@reach/router';

describe('MyBetsTab', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <MyBetsTab />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
