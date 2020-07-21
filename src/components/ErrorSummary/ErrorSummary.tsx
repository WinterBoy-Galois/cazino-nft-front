import React from 'react';

import styles from './ErrorSummary.module.scss';
import ApplicationError from '../../models/applicationError.model';

interface IProps {
  errors: ApplicationError[];
  showGeneralErrorsOnly?: boolean;
  className?: string;
}

const ErrorSummary: React.SFC<IProps> = ({
  errors,
  showGeneralErrorsOnly = true,
  className = '',
}) => {
  if (showGeneralErrorsOnly) {
    errors = errors.filter((error: ApplicationError) => {
      return !error.source;
    });
  }

  if (errors.length === 0) {
    return <></>;
  }

  if (errors.length === 1) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.wrapper}>{errors[0].message}</div>
      </div>
    );
  }

  const listItems = errors.map((error: ApplicationError, index) => {
    return <li key={index}>{error.message}</li>;
  });

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.wrapper}>
        <ul>{listItems}</ul>
      </div>
    </div>
  );
};

export default ErrorSummary;
