import React from 'react';

import styles from './CheckboxInput.module.scss';

interface IProps {
  label?: string;
  className?: string;
}

const CheckboxInput: React.SFC<IProps> = ({ label = undefined, className = '' }) => {
  return (
    <>
      <input className={styles['inp-cbx']} id="cbx" type="checkbox" style={{ display: 'none' }} />
      <label className={styles.cbx} htmlFor="cbx">
        <span className={styles.cbx__icon}>
          <svg width="20px" height="17px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span className={`${styles.cbx__label} ${className}`}>{label}</span>
      </label>
      {/* <div className={`${styles.container} ${className}`}>{message}</div> */}
    </>
  );
};

export default CheckboxInput;
