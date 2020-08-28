import React from 'react';
import styles from './HollowButton.module.scss';
import Button, { ButtonSize } from '../Button';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  size?: ButtonSize;
}

const HollowButton: React.FC<IProps> = props => {
  return (
    <Button {...props} className={`${props.className ?? ''} ${styles.hollow}`}>
      {props.children}
    </Button>
  );
};

export default HollowButton;
