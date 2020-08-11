import React from 'react';
import styles from './PageHeadline.module.scss';

const PageHeadline: React.FC = ({ children }) => {
  return <h1 className={styles.headline}>{children}</h1>;
};

export default PageHeadline;
