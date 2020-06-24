import React from 'react';
import styles from './Link.module.scss';

interface IProps {
  href?: string;
  className?: string;
  target?: '_blank';
}

const Link: React.FC<IProps> = ({ children, href, className = '', target }) => {
  return (
    <a className={`${className} ${styles.link}`} href={href} target={target}>
      {children}
    </a>
  );
};

export default Link;
