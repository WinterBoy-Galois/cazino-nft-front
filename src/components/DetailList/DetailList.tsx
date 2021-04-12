import React from 'react';
import { Detail } from './lib/detail';
import styles from './DetailList.module.scss';

interface IProps {
  details?: Detail[];
}

const DetailList: React.FC<IProps> = ({ details }) => {
  if (!details) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {details.map((d, i) => (
        <li key={i} className={styles.list__item}>
          <div className={`${styles.list__item__label} truncate`}>{d.label}</div>
          <div className={styles.list__item__value}>{d.value}</div>
        </li>
      ))}
    </ul>
  );
};

export default DetailList;
