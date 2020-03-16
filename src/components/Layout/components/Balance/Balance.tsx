import React from 'react';
import styles from './Balance.module.scss';
import Bitcoin from '../../../icons/social/Bitcoin';

interface IProps {
  value: string;
}

const Balance: React.SFC<IProps> = ({ value }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.border} />
        <div className={styles.value}>
          <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;
