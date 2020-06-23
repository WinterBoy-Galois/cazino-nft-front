import React from 'react';
import styles from './CopyField.module.scss';
import Copy from '../icons/Copy';

interface IProps {
  label: string;
  value: string;
}

const CopyField: React.FC<IProps> = ({ label, value }) => {
  const copyToClipboard = () =>
    navigator?.clipboard?.writeText ? navigator.clipboard.writeText(value) : null;

  return (
    <div className={styles.container} onClick={copyToClipboard}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.copy}>
        <Copy />
      </div>
    </div>
  );
};

export default CopyField;
