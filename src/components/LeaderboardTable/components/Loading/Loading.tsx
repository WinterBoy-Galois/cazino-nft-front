import React from 'react';
import styles from './Loading.module.scss';
import Spinner from '../../../Spinner';

const Loading: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner}>
      <Spinner color="WHITE" />
    </div>
  </div>
);

export default Loading;
