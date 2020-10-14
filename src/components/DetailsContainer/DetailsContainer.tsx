import React from 'react';
import styles from './DetailsContainer.module.scss';

interface IProps {
  className?: string;
  background?: 'LIGHT' | 'DARK';
}

const DetailsContainer: React.FC<IProps> = ({ children, className = '', background = 'LIGHT' }) => {
  const bgClass = background === 'LIGHT' ? styles['container--light'] : styles['container--dark'];

  return <div className={`${className} ${styles.container} ${bgClass}`}>{children}</div>;
};

export default DetailsContainer;
