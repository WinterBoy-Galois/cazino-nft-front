import React from 'react';
import styles from './SecondaryButton.module.scss';
import Button, { ButtonSize } from '../Button';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  size?: ButtonSize;
  disabled?: boolean;
}

const SecondaryButton: React.FC<IProps> = props => {
  return (
    <Button {...props} className={`${props.className ?? ''} ${styles.secondary}`}>
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
