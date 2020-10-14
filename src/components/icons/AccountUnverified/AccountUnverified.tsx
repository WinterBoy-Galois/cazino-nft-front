import React from 'react';
import styles from './AccountUnverified.module.scss';

interface IProps {
  className?: string;
}

const AccountUnverified: React.FC<IProps> = ({ className = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.97 22.97" className={className}>
      <g>
        <g>
          <path
            d="M10.05 15.79h2.87v2.87h-2.87zm5.74-10a1.44 1.44 0 011.44 1.44v4.3l-4.31 2.88h-2.87v-1.49l4.31-2.87V8.61H7.18V5.74zm-4.31-3.64a9.34 9.34 0 106.6 2.74 9.33 9.33 0 00-6.6-2.74zm0-2.15A11.49 11.49 0 110 11.48 11.48 11.48 0 0111.48 0z"
            className={styles.fill}
          />
        </g>
      </g>
    </svg>
  );
};

export default AccountUnverified;
