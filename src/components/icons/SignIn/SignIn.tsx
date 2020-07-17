import React from 'react';
import styles from './SignIn.module.scss';

interface IProps {
  className?: string;
}

const SignIn: React.FC<IProps> = ({ className = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.9 38" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Слой_5" data-name="Слой 5">
          <path className={styles['cls-1']} d="M34.4 27.32a17.5 17.5 0 110-16.66" />
          <circle cx="19" cy="19" r="3.07" fill="#fff" />
          <path className={styles['cls-1']} d="M24.82 19h9.58M31.57 21.83L34.4 19l-2.83-2.83" />
        </g>
      </g>
    </svg>
  );
};

export default SignIn;
