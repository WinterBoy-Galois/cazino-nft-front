import React from 'react';
import styles from './Toast.module.scss';
import Info from '../icons/Info';
import Check from '../icons/Check';
import Error from '../icons/Error';

interface IProps {
  type?: 'SUCCESS' | 'INFO' | 'ERROR';
}

const Toast: React.FC<IProps> = ({ children, type = 'INFO' }) => {
  let icon;

  switch (type) {
    case 'INFO':
      icon = <Info />;
      break;

    case 'SUCCESS':
      icon = <Check />;
      break;

    case 'ERROR':
      icon = <Error />;
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
