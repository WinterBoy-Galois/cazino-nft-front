import React from 'react';
import styles from './NavButton.module.scss';
import Arrow from '../../../icons/Arrow';

interface IProps {
  direction: string;
  onClick?: () => void;
}

const NavButton: React.FC<IProps> = ({ direction, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    <Arrow className={`${styles.arrow} ${styles[`arrow--${direction}`]}`} />
  </button>
);

export default NavButton;
