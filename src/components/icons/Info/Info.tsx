import React from 'react';
import styles from './Info.module.scss';

interface IProps {
  className?: string;
  fillClassName?: string;
}

const Info: React.SFC<IProps> = ({ className = styles.container, fillClassName = styles.fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className={className}>
      <g>
        <path
          d="M17.5 0A17.5 17.5 0 1035 17.5 17.51 17.51 0 0017.5 0zm2.56 24.54a2.14 2.14 0 01-2.14 2.14h-.83A2.14 2.14 0 0115 24.54v-6.85a2.14 2.14 0 012.14-2.15h.83a2.14 2.14 0 012.14 2.15zM17.5 13.3a3.09 3.09 0 113.1-3.09 3.09 3.09 0 01-3.1 3.09z"
          className={fillClassName}
        />
      </g>
    </svg>
  );
};

export default Info;
