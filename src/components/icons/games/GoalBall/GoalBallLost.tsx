import clsx from 'clsx';
import React from 'react';

import styles from './GoalBallLost.module.scss';

interface IProps {
  className?: string;
}

const GoalBallLost: React.FC<IProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 217.12 216.98" className={clsx(className)}>
      <defs>
        <clipPath id="clip-path-lost" transform="translate(22.45 28.01)">
          <circle className={styles["cls-1"]} cx="82.82" cy="82.82" r="73.55" />
        </clipPath>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="balls">
          <circle className={styles["cls-2"]} cx="105.28" cy="110.84" r="73.55" />
          <circle className={styles["cls-3"]} cx="105.28" cy="90.32" r="53.03" />
          <path className={styles["cls-4"]}
            d="M89.78,52.62S70.74,56.16,54,66.3c0,0-3.22,18.94,1.59,35.69a90.87,90.87,0,0,0,35.58,11s15.1-15.59,21.49-30.11C112.68,82.91,99.19,62.2,89.78,52.62Z"
            transform="translate(22.45 28.01)" />
          <line className={styles["cls-5"]} x1="105.28" y1="110.84" x2="45.21" y2="75.39" />
          <line className={styles["cls-5"]} x1="105.28" y1="110.84" x2="48.06" y2="150.71" />
          <line className={styles["cls-5"]} x1="105.28" y1="110.84" x2="126.1" y2="177.39" />
          <line className={styles["cls-5"]} x1="105.32" y1="110.9" x2="175.06" y2="110.68" />
          <line className={styles["cls-5"]} x1="105.28" y1="110.84" x2="120.42" y2="42.76" />
          <g className={styles["cls-6"]}>
            <path className={styles["cls-4"]}
              d="M96.58,128.93s-13.69,13.7-21.73,31.52c0,0,8.07,17.44,21.53,28.52a90.86,90.86,0,0,0,35.56-11.05s3.62-21.4.67-37C132.61,140.93,109.77,131.5,96.58,128.93Z"
              transform="translate(22.45 28.01)" />
            <path className={styles["cls-4"]}
              d="M135.49,82.66s9.22,17,24,29.82c0,0,19-2.76,33.47-12.49a90.93,90.93,0,0,0-.44-37.25s-19.48-9.57-35.27-11.18C157.26,51.56,141.71,70.75,135.49,82.66Z"
              transform="translate(22.45 28.01)" />
            <path className={styles["cls-4"]}
              d="M93.68,32.3s18.9-4.22,35.24-15c0,0,2.53-19-2.88-35.61A90.91,90.91,0,0,0,90.09-28S75.56-11.89,69.7,2.86C69.7,2.86,83.92,23.06,93.68,32.3Z"
              transform="translate(22.45 28.01)" />
            <path className={styles["cls-4"]}
              d="M33.1,53.94s4.67-18.8,2.38-38.22c0,0-15.9-10.78-33.14-13.34A90.91,90.91,0,0,0-22.45,30.17S-14.53,50.38-4,62.22C-4,62.22,20.47,58.53,33.1,53.94Z"
              transform="translate(22.45 28.01)" />
            <path className={styles["cls-4"]}
              d="M35.73,152.52s4.68-18.79,2.38-38.21c0,0-15.9-10.78-33.14-13.35a90.87,90.87,0,0,0-24.79,27.8s7.93,20.21,18.49,32C-1.33,160.8,23.11,157.12,35.73,152.52Z"
              transform="translate(22.45 28.01)" />
          </g>
          <path className={styles["cls-7"]}
            d="M82.82,9A73.82,73.82,0,1,1,9,82.82,73.9,73.9,0,0,1,82.82,9m0-9a82.82,82.82,0,1,0,82.82,82.82A82.82,82.82,0,0,0,82.82,0Z"
            transform="translate(22.45 28.01)" />
        </g>
      </g>
    </svg>
  );
};

export default GoalBallLost;
