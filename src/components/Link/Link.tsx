import React from 'react';
import styles from './Link.module.scss';

interface IProps {
  href?: string;
  className?: string;
}

const Link: React.FC<IProps> = ({ children, href, className = '' }) => {
  return (
    <a className={`${className} ${styles.link}`} href={href}>
      {children}
    </a>
  );
};

export default Link;
