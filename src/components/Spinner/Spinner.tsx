import React from 'react';
import styles from './Spinner.module.scss';

interface IProps {
  color: 'WHITE' | 'PRIMARY';
}

const Spinner = ({ color }: IProps) => {
  const getClassName = () => {
    switch (color) {
      case 'PRIMARY':
        return `${styles.spinner} ${styles['spinner--primary']}`;
      case 'WHITE':
      default:
        return `${styles.spinner} ${styles['spinner--white']}`;
    }
  };

  return <span className={getClassName()} />;
};

export default Spinner;
