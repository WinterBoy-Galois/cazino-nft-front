import React from 'react';
import styles from './DetailsContainer.module.scss';

interface IProps {
  className?: string;
}

const DetailsContainer: React.FC<IProps> = ({ children, className = '' }) => {
  return <div className={`${className} ${styles.container}`}>{children}</div>;
};

export default DetailsContainer;
