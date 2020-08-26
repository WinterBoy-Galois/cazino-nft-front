import React from 'react';

import styles from './PageContentContainer.module.scss';

interface IProps {
  className?: string;
}

const PageContentContainer: React.FC<IProps> = ({ className = '', children }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default PageContentContainer;
