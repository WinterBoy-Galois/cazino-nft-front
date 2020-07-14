import React from 'react';

import styles from './Toast.module.scss';
import Info from '../icons/Info';

interface IProps {
  type?: 'SUCCESS' | 'INFO' | 'ERROR';
}

const Toast: React.SFC<IProps> = ({ children, type = 'INFO' }) => {
  let icon;

  switch (type) {
    case 'INFO':
      icon = <Info />;
      break;

    case 'SUCCESS':
      icon = <Info />;
      break;

    case 'ERROR':
      icon = <Info />;
      break;
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default Toast;
