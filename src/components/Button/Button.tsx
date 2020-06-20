import React from 'react';
import styles from './Button.module.scss';
import { ButtonSize } from './lib/size';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  size?: ButtonSize;
}

const Button: React.SFC<IProps> = ({
  children,
  type = 'button',
  className = '',
  onClick,
  size = ButtonSize.SMALL,
}) => {
  return (
    <button
      type={type}
      className={`${className} ${styles.button} ${styles[`button--${size.toString()}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
