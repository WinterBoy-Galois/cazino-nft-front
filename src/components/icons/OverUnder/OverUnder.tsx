import React from 'react';

import styles from './OverUnder.module.scss';

interface IProps {
  className?: string;
}

const OverUnder: React.FC<IProps> = ({ className = styles.fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.04 15.74"
      className={`${styles.fill} ${className}`}
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path
            data-name="Icon material-compare-arrows"
            d="M6.45 8.47A.41.41 0 016 8.06V.41A.41.41 0 005.63 0H4a.41.41 0 00-.42.41v7.65a.41.41 0 01-.41.41H0l4.83 4.82 4.83-4.82zm.92-1.2h3.22a.42.42 0 01.41.41v7.65a.41.41 0 00.41.41H13a.41.41 0 00.42-.41V7.68a.41.41 0 01.41-.41H17l-4.79-4.82z"
          />
        </g>
      </g>
    </svg>
  );
};

export default OverUnder;
