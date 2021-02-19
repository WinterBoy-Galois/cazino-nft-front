import React from 'react';
import { render } from '@testing-library/react';

import BonusesTable from '.';
import { LocationProvider } from '@reach/router';

describe('BonusesTable', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <BonusesTable />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
