import React from 'react';
import { boolean, object } from '@storybook/addon-knobs';
import DepositsDetailsModal from '.';
import { TransactionStatus } from '../../models/transactionStatus.model';

export default {
  title: 'Components/DepositsDetailsModal',
  component: DepositsDetailsModal,
};

const data = {
  show: true,
  item: {
    status: TransactionStatus.DEPOSIT_CONFIRMED,
    time: 1601849619230,
    hash: 'cd28f4613191a4e8fc6613b1ff9e675a16f1f6341ab20067d753a83d35ddca2a',
    amount: 0.0011234,
  },
};

export const Default = () => (
  <DepositsDetailsModal
    show={boolean('Show', data.show)}
    item={object('Deposit Item', data.item)}
  />
);
