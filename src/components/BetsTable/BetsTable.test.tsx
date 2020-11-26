import React from 'react';
import { render } from '@testing-library/react';

import BetsTable from '.';
import { LocationProvider } from '@reach/router';

describe('BetsTable', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <BetsTable data={[]} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
