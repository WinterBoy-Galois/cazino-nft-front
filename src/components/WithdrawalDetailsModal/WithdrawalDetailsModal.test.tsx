import React from 'react';
import { render } from '@testing-library/react';
import WithdrawalDetailsModal from '.';
import { LocationProvider } from '@reach/router';

describe('WithdrawalDetailsModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <WithdrawalDetailsModal show={true} address="" amount={0} time="" status="" />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
