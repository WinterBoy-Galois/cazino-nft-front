import React from 'react';
import styles from './Error.module.scss';

interface IProps {
  className?: string;
}

const Error: React.FC<IProps> = ({ children, className }) => (
  <div className={`${className} ${styles.container}`}>
    {children ?? 'Sorry, there was an unexpected error.'}
  </div>
);

export default Error;
