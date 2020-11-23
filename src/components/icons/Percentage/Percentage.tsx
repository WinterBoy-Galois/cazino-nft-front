import React from 'react';

import styles from './Percentage.module.scss';

interface IProps {
  className?: string;
}

const Percentage: React.FC<IProps> = ({ className = styles.fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.82 15.82"
      className={`${styles.fill} ${className}`}
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path
            data-name="Icon awesome-percentage"
            d="M4.5 4.5a2.64 2.64 0 10-3.73 0 2.64 2.64 0 003.73 0zm10.55 6.82a2.64 2.64 0 100 3.73 2.64 2.64 0 000-3.73zM15 1.78l-1-.93a1.33 1.33 0 00-1.87 0L.85 12.17a1.32 1.32 0 000 1.83l.93.93a1.33 1.33 0 001.87 0L15 3.65a1.33 1.33 0 000-1.87z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Percentage;
