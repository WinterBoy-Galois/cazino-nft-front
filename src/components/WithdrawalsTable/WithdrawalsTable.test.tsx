import React from 'react';
import { render } from '@testing-library/react';

import WithdrawalsTable from '.';
import { LocationProvider } from '@reach/router';

describe('WithdrawalsTable', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <WithdrawalsTable data={[]} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
