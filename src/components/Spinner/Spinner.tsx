import React from 'react';
import styles from './Spinner.module.scss';

interface IProps {
  color: 'WHITE' | 'PRIMARY';
  className?: string;
}

const Spinner: React.FC<IProps> = ({ color, className = '' }) => {
  const getClassName = () => {
    switch (color) {
      case 'PRIMARY':
        return `${styles.spinner} ${styles['spinner--primary']} ${className}`;
      case 'WHITE':
      default:
        return `${styles.spinner} ${styles['spinner--white']} ${className}`;
    }
  };

  return <span className={getClassName()} />;
};

export default Spinner;
