import clsx from 'clsx';
import React from 'react';
import { TransactionStatus as Status } from '../../../../models/transactionStatus.model';

import styles from './TransactionStatus.module.scss';

interface IProps {
  status: Status;
}

const TransactionStatus: React.FC<IProps> = ({ status }) => {
  let className = '';

  switch (status) {
    case Status.DEPOSIT_CONFIRMED:
      className = styles['status--confirmed'];
      break;
    case Status.DEPOSIT_PENDING:
      className = styles['status--pending'];
      break;
    case Status.DEPOSIT_REJECTED:
      className = styles['status--rejected'];
      break;
  }

  return <div className={clsx(styles.status, className)} />;
};

export default TransactionStatus;
