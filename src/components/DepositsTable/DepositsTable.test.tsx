import React from 'react';
import { render } from '@testing-library/react';

import DepositsTable from '.';
import { LocationProvider } from '@reach/router';

describe('DepositsTable', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <DepositsTable data={[]} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
