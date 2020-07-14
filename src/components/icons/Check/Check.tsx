import React from 'react';
import styles from './Check.module.scss';

interface IProps {
  className?: string;
  fillClassName?: string;
}

const Check: React.FC<IProps> = ({ className = styles.container, fillClassName = styles.fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.94 30.94" className={className}>
      <g>
        <g>
          <path
            d="M15.5 30.94a15.44 15.44 0 1111-4.54 15.5 15.5 0 01-11 4.54zM7.4 12.77a1.1 1.1 0 00-.79.32L5 14.68a1.11 1.11 0 000 1.58l7.27 7.28a1.11 1.11 0 001.58 0l12.91-12.88a1.11 1.11 0 000-1.58L25.18 7.5a1.12 1.12 0 00-1.59 0L13.09 18l-4.9-4.9a1.11 1.11 0 00-.79-.33z"
            className={fillClassName}
          />
        </g>
      </g>
    </svg>
  );
};

export default Check;
