import React from 'react';
import styles from './CardHeadline.module.scss';

const CardHeadline: React.FC = ({ children }) => {
  return <h2 className={styles.headline}>{children}</h2>;
};

export default CardHeadline;
