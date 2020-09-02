import React from 'react';
import styles from './Eye.module.scss';

interface IProps {
  className?: string;
}

const Eye: React.FC<IProps> = ({ className = styles.fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.49 21.53"
      className={`${styles.fill} ${className}`}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Icon_feather-eye" data-name="Icon feather-eye">
            <path
              id="Path_870"
              data-name="Path 870"
              d="M1.5 10.77S6.13 1.5 14.24 1.5 27 10.77 27 10.77 22.35 20 14.24 20 1.5 10.77 1.5 10.77z"
            />
            <path
              id="Path_871"
              data-name="Path 871"
              d="M17.72 10.77a3.48 3.48 0 11-3.48-3.48 3.47 3.47 0 013.48 3.48z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Eye;
