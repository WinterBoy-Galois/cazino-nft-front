import clsx from 'clsx';
import React from 'react';
import { TransactionStatus as Status } from '../../models/transactionStatus.model';
import styles from './TransactionStatus.module.scss';

interface IProps {
  status: Status;
  showText?: boolean;
}

const TransactionStatus: React.FC<IProps> = ({ status, showText = false }) => {
  let className = '';
  let statusText = '';

  switch (status) {
    case Status.DEPOSIT_CONFIRMED:
    case Status.WITHDRAW_CONFIRMED:
      className = styles['status--confirmed'];
      statusText = 'CONFIRMED';
      break;
    case Status.DEPOSIT_PENDING:
    case Status.WITHDRAW_PENDING:
      className = styles['status--pending'];
      statusText = 'PENDING';
      break;
    case Status.DEPOSIT_REJECTED:
    case Status.TRANSACTION_REJECTED:
      className = styles['status--rejected'];
      statusText = 'REJECTED';
      break;
  }

  return (
    <div className={styles.container}>
      <div className={clsx(styles.status, className)} data-tag="allowRowEvents" />
      {showText && <div className={styles.text}>{statusText}</div>}
    </div>
  );
};

export default TransactionStatus;
