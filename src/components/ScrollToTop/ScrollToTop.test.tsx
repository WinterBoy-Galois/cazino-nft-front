import React from 'react';
import { render } from '@testing-library/react';

import ScrollToTop from '.';
import { LocationProvider } from '@reach/router';

describe('ScrollToTop', () => {
  it('should match snapshot', () => {
    // Arrange
    global.scrollTo = jest.fn();

    // Act
    const container = render(
      <LocationProvider>
        <ScrollToTop />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
