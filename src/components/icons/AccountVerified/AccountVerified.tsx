import React from 'react';
import styles from './AccountVerified.module.scss';

interface IProps {
  className?: string;
}

const AccountVerified: React.FC<IProps> = ({ className = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.13 23.13" className={className}>
      <g>
        <g>
          <g>
            <path
              className={styles.fill}
              d="M11.57 23.13a11.57 11.57 0 110-23.13 11.53 11.53 0 014.7 1 1.5 1.5 0 01-1.22 2.74A8.5 8.5 0 0011.57 3a8.57 8.57 0 000 17.13 8.55 8.55 0 008.56-8.56v-.92a1.5 1.5 0 013 0v.92a11.56 11.56 0 01-11.56 11.56z"
            />
            <path
              className={styles.fill}
              d="M11.57 15.09a1.46 1.46 0 01-1.06-.44l-3-3a1.49 1.49 0 010-2.12 1.51 1.51 0 012.12 0l2 2 9-9a1.5 1.5 0 012.07 2.05L12.63 14.65a1.46 1.46 0 01-1.06.44z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default AccountVerified;
