import React from 'react';
import styles from './CopyField.module.scss';
import Copy from '../icons/Copy';
import copy from 'copy-to-clipboard';

interface IProps {
  label: string;
  value: string;
  className?: string;
}

const CopyField: React.FC<IProps> = ({ label, value, className = '' }) => {
  const copyToClipboard = () => copy(value);

  return (
    <div className={`${className} ${styles.container}`} onClick={copyToClipboard}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.copy}>
        <Copy />
      </div>
    </div>
  );
};

export default CopyField;
