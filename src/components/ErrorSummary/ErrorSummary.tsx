import React from 'react';

import styles from './ErrorSummary.module.scss';

interface IProps {
  message?: string;
  className?: string;
}

const ErrorSummary: React.SFC<IProps> = ({ message = undefined, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.wrapper}>{message}</div>
    </div>
  );
};

export default ErrorSummary;
