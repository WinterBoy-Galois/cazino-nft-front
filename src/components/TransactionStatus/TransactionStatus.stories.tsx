import React from 'react';
import { TransactionStatus as Status } from '../../models/transactionStatus.model';

import TransactionStatus from '.';

export default {
  title: 'Components/TransactionStatus',
  component: TransactionStatus,
};

export const Default = () => <TransactionStatus status={Status.DEPOSIT_CONFIRMED} />;
