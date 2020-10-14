import React from 'react';
import styles from './CardHeadline.module.scss';

interface IProps {
  className?: string;
}

const CardHeadline: React.FC<IProps> = ({ children, className = '' }) => {
  return <h2 className={`${styles.headline} ${className}`}>{children}</h2>;
};

export default CardHeadline;
