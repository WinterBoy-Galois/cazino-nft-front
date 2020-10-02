import React from 'react';
import styles from './External.module.scss';

interface IProps {
  className?: string;
  fillClassName?: string;
}

const External: React.FC<IProps> = ({ className = styles.default, fillClassName }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className={className}>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path
            data-name="Icon open-external-link"
            d="M0 0v12h12V9h-1.5v1.5h-9v-9H3V0zm6 0l2.25 2.25L4.5 6 6 7.5l3.75-3.75L12 6V0z"
            className={fillClassName ?? styles.fill}
          />
        </g>
      </g>
    </svg>
  );
};

export default External;
