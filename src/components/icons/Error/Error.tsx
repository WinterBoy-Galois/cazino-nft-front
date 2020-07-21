import React from 'react';
import styles from './Error.module.scss';

interface IProps {
  className?: string;
  fillClassName?: string;
}

const Error: React.FC<IProps> = ({ className = styles.container, fillClassName = styles.fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.05 30.05" className={className}>
      <g>
        <g>
          <path
            d="M15 30.05a15 15 0 1110.7-4.49l-.09.09A14.89 14.89 0 0115 30.05zm-5.82-24a.58.58 0 00-.4.16L6.17 8.82a.57.57 0 000 .8l5.52 5.53-5.52 5.52a.57.57 0 000 .8l2.61 2.61a.57.57 0 00.6.13.63.63 0 00.2-.13l5.52-5.52 5.52 5.52a.57.57 0 00.8 0L24 21.47a.57.57 0 000-.8l-5.52-5.52L24 9.62a.59.59 0 000-.8l-2.57-2.61a.6.6 0 00-.6-.13.58.58 0 00-.2.13l-5.53 5.52-5.52-5.52a.69.69 0 00-.2-.13.64.64 0 00-.2-.03z"
            className={fillClassName}
          />
        </g>
      </g>
    </svg>
  );
};

export default Error;
