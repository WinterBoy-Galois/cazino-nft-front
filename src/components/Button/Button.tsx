import React from 'react';
import styles from './Button.module.scss';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
}

const Button: React.SFC<IProps> = ({ children, type = 'button', className = '', onClick }) => {
  return (
    <button type={type} className={`${className} ${styles.button}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
