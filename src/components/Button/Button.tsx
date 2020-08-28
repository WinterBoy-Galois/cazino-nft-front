import React from 'react';
import styles from './Button.module.scss';
import { ButtonSize } from './lib/size';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  size?: ButtonSize;
  disabled?: boolean;
}

const Button: React.FC<IProps> = props => {
  const { type = 'button', className = '', size = ButtonSize.SMALL } = props;
  return (
    <button
      {...props}
      className={`${className} ${styles.button} ${styles[`button--${size.toString()}`]}`}
      type={type}
    />
  );
};

export default Button;
