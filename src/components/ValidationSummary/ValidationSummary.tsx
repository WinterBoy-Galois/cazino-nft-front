import React from 'react';

import styles from './ValidationSummary.module.scss';

interface IProps {
  message?: string;
  className?: string;
}

const ValidationSummary: React.SFC<IProps> = ({ message = undefined, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.wrapper}>{message}</div>
    </div>
  );
};

export default ValidationSummary;
