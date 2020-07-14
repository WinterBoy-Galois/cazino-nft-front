import React from 'react';

import styles from './Toast.module.scss';

interface IProps {
  type?: 'SUCCESS' | 'INFO' | 'ERROR';
}

const Toast: React.SFC<IProps> = ({ children, type = 'INFO' }) => {
  return (
    <div className={styles.container}>
      <div>{type}</div>
      <div>{children}</div>
    </div>
  );
};

export default Toast;
