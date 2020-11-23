import React from 'react';

import styles from './Multiplier.module.scss';

interface IProps {
  className?: string;
}

const Multiplier: React.FC<IProps> = ({ className = styles.fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.43 15.42"
      className={`${styles.fill} ${className}`}
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path
            data-name="Icon metro-cross"
            d="M15.28 12.39l-4.67-4.68L15.28 3a.48.48 0 000-.68L13.07.14a.48.48 0 00-.68 0L7.71 4.82 3 .14a.48.48 0 00-.68 0L.14 2.35a.48.48 0 000 .65l4.68 4.71-4.68 4.68a.48.48 0 000 .68l2.21 2.21a.48.48 0 00.68 0H3l4.71-4.68 4.68 4.68a.49.49 0 00.69 0l2.21-2.21a.5.5 0 000-.68z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Multiplier;
