import React from 'react';
import styles from './Title.module.scss';
import Alert from '../../../icons/Alert';

const Title: React.FC = () => {
  return (
    <div className={styles.container}>
      <Alert className={styles.icon} />
      Confirm
    </div>
  );
};

export default Title;
