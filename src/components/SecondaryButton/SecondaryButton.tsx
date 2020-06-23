import React from 'react';
import styles from './SecondaryButton.module.scss';
import Button, { ButtonSize } from '../Button';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  size?: ButtonSize;
}

const SecondaryButton: React.SFC<IProps> = props => {
  return (
    <Button {...props} className={`${props.className ?? ''} ${styles.secondary}`}>
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
