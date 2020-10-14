import React from 'react';
import styles from './Mines.module.scss';

interface IProps {
  className?: string;
}

const Mines: React.FC<IProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_5" data-name="Layer 5">
          <circle cx="17.5" cy="17.5" r="17.5" fill="#fff" />
          <path
            className={styles['cls-2']}
            d="M19.43 13.66l-5.18 3.12-3.12-5.17 5.18-3.12 3.12 5.17z"
          />
          <path
            className={styles['cls-2']}
            d="M19.43 13.66l-5.18 3.12-3.12-5.17 5.18-3.12 3.12 5.17z"
          />
          <path
            className={styles['cls-2']}
            d="M13.24 10.34l1-.61a6 6 0 00-6.2-2.85.53.53 0 00-.46.5.53.53 0 00.58.54 5 5 0 015.08 2.42z"
          />
          <path
            className={styles['cls-2']}
            d="M12.74 3.49L9.85 5.65 9 1l-.76 4.68-3.92-4.39 2.71 5-4-1.46 3.29 2.52L0 9.05l6.04-.03-2.64 3.51L7.38 9.9l1.05 3.45.82-4.19 2.21 1.54-1.3-3.3 2.58-3.91z"
          />
          <ellipse className={styles['cls-2']} cx="20.84" cy="21.86" rx="11.16" ry="11.14" />
          <path
            d="M29.58 19.39a11.13 11.13 0 00-5.4-5.84"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="1.07"
          />
        </g>
      </g>
    </svg>
  );
};

export default Mines;
