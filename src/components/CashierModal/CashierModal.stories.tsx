import React from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';

import CashierModal from '.';

export default {
  title: 'Components/CashierModal',
  component: CashierModal,
};

const data = {
  show: true,
  cashier: {
    networkFee: 0.00075295,
    depositConfirmations: 2,
    minWithdraw: 2e-7,
  },
  depositAddress: '3CaQi76neM8qoDh18pLq5W8Hru1sNVRoDY',
};

export const Default = () => (
  <CashierModal
    show={boolean('Show', data.show)}
    loading={boolean('Loading', false)}
    error={boolean('Error', false)}
    cashier={{
      networkFee: number('Network fee', data.cashier.networkFee),
      depositConfirmations: number('Confirmations', data.cashier.depositConfirmations),
      minWithdraw: number('Min Withdraw', data.cashier.minWithdraw),
    }}
    depositAddress={text('Deposit Address', data.depositAddress)}
  />
);
