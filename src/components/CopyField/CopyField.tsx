import React from 'react';
import styles from './CopyField.module.scss';
import Copy from '../icons/Copy';

interface IProps {
  label: string;
  value: string;
}

const CopyField: React.FC<IProps> = ({ label, value }) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.copy}>
        <Copy />
      </div>
    </div>
  );
};

export default CopyField;
