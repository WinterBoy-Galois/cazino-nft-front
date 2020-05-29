import React from 'react';
import styles from './Dot.module.scss';

interface IProps {
  onClick?: () => void;
  isActive?: boolean;
}

const Dot: React.FC<IProps> = ({ onClick, isActive }) => (
  <div
    className={`${styles.dot__wrapper} ${
      isActive ? styles['dot__wrapper--active'] : styles['dot__wrapper--inactive']
    }`}
    onClick={onClick}
  >
    <div className={styles.dot}></div>
  </div>
);

export default Dot;
