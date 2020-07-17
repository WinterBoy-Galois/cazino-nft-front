import React from 'react';
import styles from './Link.module.scss';

interface IProps {
  href?: string;
  className?: string;
  target?: '_blank';
  onClick?: () => void;
}

const Link: React.FC<IProps> = ({ children, href = '', className = '', target, onClick }) => {
  return (
    <a
      className={`${className} ${styles.link}`}
      href={href}
      target={target}
      onClick={event => {
        event.preventDefault();

        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </a>
  );
};

export default Link;
