import React from 'react';
import styles from './Alert.module.scss';

interface IProps {
  className?: string;
}

const Alert: React.FC<IProps> = ({ className = styles.fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.99 30.05" className={`${className}`}>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <g data-name="Group 1060">
            <path
              data-name="Path 1673"
              d="M34.68 26.66L19.42 1.09a2.25 2.25 0 00-3.85 0L.32 26.66a2.24 2.24 0 001.92 3.39h30.51A2.24 2.24 0 0035 27.8a2.27 2.27 0 00-.32-1.14zM17.5 28.71a2.13 2.13 0 112.12-2.13 2.13 2.13 0 01-2.12 2.13zm2.11-8a1.69 1.69 0 01-1.68 1.58h-.87a1.69 1.69 0 01-1.68-1.58L14.6 8.62a1.69 1.69 0 011.57-1.79h2.55a1.69 1.69 0 011.68 1.69v.1z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Alert;
