import React, { useCallback } from 'react';
import styles from './CopyField.module.scss';
import Copy from '../icons/Copy';
import copy from 'copy-to-clipboard';

interface IProps {
  label: string;
  value: string;
  className?: string;
  disabled?: boolean;
}

const CopyField: React.FC<IProps> = ({ label, value, className = '', disabled }) => {
  const copyToClipboard = useCallback(() => {
    if (!disabled) {
      copy(value);
    }
  }, [disabled, value]);

  return (
    <div
      className={`${className} ${styles.container} ${disabled ? styles.disabled : ''}`}
      onClick={copyToClipboard}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.copy}>
        <Copy />
      </div>
    </div>
  );
};

export default CopyField;
