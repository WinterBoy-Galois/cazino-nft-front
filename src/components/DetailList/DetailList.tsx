import React from 'react';
import { Detail } from './lib/detail';
import styles from './DetailList.module.scss';
import clsx from 'clsx';

interface IProps {
  details?: Detail[];
}

const DetailList: React.FC<IProps> = ({ details }) => {
  if (!details) {
    return null;
  }

  console.log('details = ', details);
  return (
    <ul className={styles.list}>
      {details.map((d, i) => (
        <li key={i} className={styles.list__item}>
          <div
            className={clsx(
              details[0].label === 'Date/time'
                ? `${styles.list__item__label_bet} truncate`
                : `${styles.list__item__label} truncate`
            )}
          >
            {d.label}
          </div>
          <div
            className={clsx(
              details[0].label === 'Date/time'
                ? styles.list__item__value_bet
                : styles.list__item__value
            )}
          >
            {d.value}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DetailList;
