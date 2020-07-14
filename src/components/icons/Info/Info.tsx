import React from 'react';
import styles from './Info.module.scss';

interface IProps {
  className?: string;
  fillClassName?: string;
}

const Info: React.FC<IProps> = ({ className = styles.container, fillClassName = styles.fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.02 31.02" className={className}>
      <g>
        <g>
          <path
            d="M15.51 0A15.51 15.51 0 1031 15.51 15.5 15.5 0 0015.51 0zm0 6.88a2.63 2.63 0 11-2.63 2.63 2.63 2.63 0 012.63-2.63zM19 22.76a.75.75 0 01-.75.75h-5.5a.75.75 0 01-.75-.75v-1.5a.76.76 0 01.75-.75h.75v-4h-.75a.75.75 0 01-.75-.75v-1.5a.76.76 0 01.75-.75h4a.76.76 0 01.75.75v6.26h.75a.75.75 0 01.75.75z"
            className={fillClassName}
          />
        </g>
      </g>
    </svg>
  );
};

export default Info;
