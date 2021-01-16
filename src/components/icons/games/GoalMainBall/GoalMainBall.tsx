import clsx from 'clsx';
import React from 'react';

import styles from './GoalMainBall.module.scss';

interface IProps {
  className?: string;
}

const GoalMainBall: React.FC<IProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 390.94 364.08"
      className={clsx(className)}
    >
      <defs>
        <clipPath id="clip-path-main-ball" transform="translate(71.62 64.49)">
          <circle className={styles['cls-1']} cx="127.27" cy="127.27" r="127.24" />
        </clipPath>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="front_ball" data-name="front ball">
          <ellipse className={styles['cls-2']} cx="198.99" cy="319.04" rx="66.11" ry="9.04" />
          <circle className={styles['cls-3']} cx="198.89" cy="191.76" r="127.24" />
          <circle className={styles['cls-4']} cx="190.2" cy="157.34" r="91.74" />
          <path
            className={styles['cls-5']}
            d="M126.15,73.66S95.71,87.66,72,111.75c0,0,2.62,33.14,17.79,59.2,0,0,28.88,9,64.34,3.45,0,0,18.73-32.56,23.31-59.62C177.4,114.78,146,85.75,126.15,73.66Z"
            transform="translate(71.62 64.49)"
          />
          <line className={styles['cls-6']} x1="198.89" y1="191.76" x2="83.13" y2="157.74" />
          <line className={styles['cls-6']} x1="198.89" y1="191.76" x2="119.8" y2="282.87" />
          <line className={styles['cls-6']} x1="198.89" y1="191.76" x2="262.01" y2="294.59" />
          <line className={styles['cls-6']} x1="198.99" y1="191.86" x2="315.88" y2="161.95" />
          <line className={styles['cls-6']} x1="198.89" y1="191.76" x2="195.47" y2="71.16" />
          <g className={styles['cls-7']}>
            <path
              className={styles['cls-5']}
              d="M169.88,198.8s-17.16,28.77-23.1,62.08c0,0,20.92,25.82,48.18,38.72,0,0,28.89-9,55-33.59,0,0-3-37.44-14.55-62.34C235.4,203.67,193.1,197.52,169.88,198.8Z"
              transform="translate(71.62 64.49)"
            />
            <path
              className={styles['cls-5']}
              d="M215.56,104.71s22.68,24.66,52.9,39.85c0,0,30.73-12.68,50.86-35.14,0,0-.34-30.23-16.51-62.28,0,0-36.74-7.81-63.9-3.84C238.91,43.3,221,82.1,215.56,104.71Z"
              transform="translate(71.62 64.49)"
            />
            <path
              className={styles['cls-5']}
              d="M124.09,37.93s29.92-15.09,52.79-40c0,0-3.81-33-19.92-58.51,0,0-29.18-7.94-64.42-1.13,0,0-17.55,33.21-21.14,60.42C71.4-1.31,103.81,26.57,124.09,37.93Z"
              transform="translate(71.62 64.49)"
            />
            <path
              className={styles['cls-5']}
              d="M31.63,99.88s-.12-33.51-12.18-65.11c0,0-31.24-11.35-61.25-8.35,0,0-20.15,22.55-29.82,57.12,0,0,21.86,30.54,44.59,45.92C-27,129.46,12.4,112.93,31.63,99.88Z"
              transform="translate(71.62 64.49)"
            />
            <path
              className={styles['cls-5']}
              d="M77.8,264.14S77.68,230.63,65.61,199c0,0-31.24-11.36-61.24-8.36,0,0-20.15,22.56-29.82,57.13,0,0,21.86,30.54,44.59,45.92C19.14,293.72,58.57,277.19,77.8,264.14Z"
              transform="translate(71.62 64.49)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default GoalMainBall;
