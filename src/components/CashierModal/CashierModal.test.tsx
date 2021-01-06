import React from 'react';
import { render } from '@testing-library/react';
import CashierModal from '.';

describe('CashierModal', () => {
  xit('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <CashierModal
        show
        loading={false}
        cashier={{
          networkFee: 0.00075295,
          depositConfirmations: 2,
          minWithdraw: 2e-7,
        }}
        depositAddress={'3CaQi76neM8qoDh18pLq5W8Hru1sNVRoDY'}
      />
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
