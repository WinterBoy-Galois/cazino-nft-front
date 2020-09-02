import React from 'react';
import styles from './Uppercase.module.scss';

interface IProps {
  className?: string;
}

const Uppercase: React.FC<IProps> = ({ children, className = '' }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Uppercase;
