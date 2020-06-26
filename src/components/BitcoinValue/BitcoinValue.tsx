import React from 'react';
import styles from './BitcoinValue.module.scss';
import Bitcoin from '../icons/social/Bitcoin';

interface IProps {
  value: string;
  className?: string;
}

const BitcoinValue: React.SFC<IProps> = ({ value, className = '' }) => {
  return (
    <div className={className}>
      <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
      <span>{value}</span>
    </div>
  );
};

export default BitcoinValue;
