import React from 'react';
import styles from './Faucet.module.scss';

interface IProps {
  className?: string;
}

const Faucet: React.FC<IProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.24 35" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Слой_5" data-name="Слой 5">
          <rect className={styles['cls-1']} y="21.25" width="7.28" height="2.71" />
          <rect
            className={styles['cls-1']}
            x="11.02"
            y="9.92"
            width="9.59"
            height="10.45"
            rx="1.96"
          />
          <path
            className={styles['cls-1']}
            d="M1.05,19.92v.55H6.23v-.55a1.84,1.84,0,0,1,1.84-1.84H9.9V12.9H8.07A7,7,0,0,0,1.05,19.92Z"
          />
          <rect className={styles['cls-1']} x="21.73" y="12.92" width="4.59" height="5.13" />
          <path
            className={styles['cls-1']}
            d="M24.88,1.46,19.25,2.75a3.52,3.52,0,0,0-6.87,0L6.75,1.46a2.13,2.13,0,0,0-2.6,2.07h0A2.12,2.12,0,0,0,6.75,5.6l5.63-1.28a3.53,3.53,0,0,0,1.75,2.3V8.69H17.5V6.62a3.56,3.56,0,0,0,1.75-2.3L24.88,5.6a2.12,2.12,0,0,0,2.6-2.07h0A2.13,2.13,0,0,0,24.88,1.46Z"
          />
          <path
            className={styles['cls-1']}
            d="M30.25,9.22A2.2,2.2,0,0,0,28,11.42v9a2.2,2.2,0,0,0,2.21,2.2h1V9.22Z"
          />
          <path
            className={styles['cls-1']}
            d="M7,30.63a11.74,11.74,0,0,0-3.37-5.89A11.82,11.82,0,0,0,.27,30.63a3.07,3.07,0,0,0-.07.53,1.18,1.18,0,0,0,0,.25A3.52,3.52,0,0,0,3.64,35,3.53,3.53,0,0,0,7.1,31.41a2.25,2.25,0,0,0,0-.25A3.07,3.07,0,0,0,7,30.63ZM2.44,27.92a10.86,10.86,0,0,0-1.22,3,.33.33,0,0,1-.32.27H.83a.34.34,0,0,1-.26-.39,10.8,10.8,0,0,1,1.32-3.2.33.33,0,1,1,.55.35Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Faucet;
