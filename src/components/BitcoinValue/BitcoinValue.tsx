import React from 'react';
import styles from './BitcoinValue.module.scss';
import Bitcoin from '../icons/social/Bitcoin';

interface IProps {
  value: string;
  className?: string;
}

const BitcoinValue: React.FC<IProps> = ({ value, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`} data-tag="allowRowEvents">
      <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
      <span className="truncate" data-tag="allowRowEvents">
        {value}
      </span>
    </div>
  );
};

export default BitcoinValue;
