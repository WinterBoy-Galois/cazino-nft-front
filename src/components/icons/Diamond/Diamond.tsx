import clsx from 'clsx';
import React from 'react';
import styles from './Diamond.module.scss';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
}

const Diamond: React.FC<IProps> = ({ className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 106.22 58.86"
      className={clsx(className)}
      style={style}
    >
      <defs>
        <style>
          {'.cls-1{fill:#5cc2f3}.cls-2{fill:#8ddfff}.cls-3{fill:#1db4ef}.cls-5{fill:#fff}'}
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="diamond">
          <path
            className={styles['cls-1']}
            d="M106.22 27.02zM0 27.02zM43.84 0l62.38 27.02L43.84 0zM43.84 0L0 27.02 43.84 0zM43.84 54.05L0 27.02l43.84 27.03 62.38-27.03-62.38 27.03z"
          />
          <path className={styles['cls-2']} d="M43.84 27.02v27.03l62.38-27.03H43.84z" />
          <path
            className={styles['cls-3']}
            d="M43.84 27.02H0l43.84 27.03V27.02zM43.84 0v27.02h62.38L43.84 0z"
          />
          <path className={styles['cls-2']} d="M0 27.02h43.84V0L0 27.02z" />
          <path
            className={styles['cls-1']}
            d="M96.33 27.02L44.13 4.41 7.44 27.02h.01l36.68 22.62 52.2-22.62z"
          />
          <path className={styles['cls-3']} d="M43.89 4.56L7.53 26.97h36.36V4.56z" />
          <path
            className={styles['cls-2']}
            d="M7.53 26.97l-.08.05 36.44 22.47V26.97H7.53zM44.13 4.41l-.24.15v22.41h52.32L44.13 4.41z"
          />
          <path
            className={styles['cls-3']}
            d="M96.21 26.97H43.89v22.52l.24.15 52.2-22.62-.12-.05z"
          />
          <path
            className={styles['cls-4']}
            d="M16.97 27.02l27.56-16.99 39.22 16.99-39.22 16.99-27.56-16.99z"
          />
          <path
            className={styles['cls-5']}
            d="M25.67 10.15a6.5 6.5 0 006.07 6.5 6.5 6.5 0 00-6.07 6.51 6.51 6.51 0 00-6.08-6.51 6.51 6.51 0 006.08-6.5zM64.21 35.11A11.87 11.87 0 0075.28 47a11.87 11.87 0 00-11.07 11.86A11.89 11.89 0 0053.11 47a11.89 11.89 0 0011.1-11.89zM66.41 22.42a3.9 3.9 0 003.64 3.91 3.9 3.9 0 00-3.64 3.9 3.91 3.91 0 00-3.65-3.9 3.91 3.91 0 003.65-3.91z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Diamond;
