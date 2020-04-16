import React from 'react';
import styles from './Error.module.scss';

const Error: React.FC = ({ children }) => <div className={styles.container}>{children}</div>;

export default Error;
