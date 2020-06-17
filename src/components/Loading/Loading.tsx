import React from 'react';
import styles from './Loading.module.scss';
import Spinner from '../Spinner';

interface IProps {
  className?: string;
}

const Loading: React.FC<IProps> = ({ className = '' }) => (
  <div className={`${className} ${styles.container}`}>
    <div className={styles.spinner}>
      <Spinner color="WHITE" />
    </div>
  </div>
);

export default Loading;
