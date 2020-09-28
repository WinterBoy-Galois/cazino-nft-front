import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styles from './Deposits.module.scss';

const Deposits: React.FC<RouteComponentProps> = () => {
  return <div className={`${styles.container}`}>Deposits</div>;
};

export default Deposits;
