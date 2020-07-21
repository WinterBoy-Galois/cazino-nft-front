import React from 'react';

import styles from './ErrorSummary.module.scss';
import ApplicationError from '../../models/applicationError.model';

interface IProps {
  errors: ApplicationError[];
  showGeneralErrorsOnly?: boolean;
  className?: string;
}

const ErrorSummary: React.SFC<IProps> = ({
  // errors,
  // showGeneralErrorsOnly = true,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.wrapper}></div>
    </div>
  );
};

export default ErrorSummary;
