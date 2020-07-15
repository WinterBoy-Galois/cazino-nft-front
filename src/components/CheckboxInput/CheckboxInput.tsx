import React, { useState, useEffect } from 'react';

import styles from './CheckboxInput.module.scss';

interface IProps {
  name?: string;
  label?: string;
  className?: string;
  validationMessage?: string;
  onChangeValue?: (value: boolean) => void;
  value?: boolean;
}

const CheckboxInput: React.SFC<IProps> = ({
  name,
  label,
  className = '',
  validationMessage,
  onChangeValue,
  value: initialValue = false,
}) => {
  const [value, setValue] = useState<boolean>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOnChange = () => {
    const newValue = !value;

    setValue(newValue);

    if (onChangeValue) {
      onChangeValue(newValue);
    }
  };

  const keypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnterOrSpace = event.key === ' ' || event.key === 'Enter';
    if (isEnterOrSpace) {
      handleOnChange();
    }
  };

  return (
    <>
      <input
        name={name}
        className={styles['inp-cbx']}
        id="cbx"
        type="checkbox"
        onChange={handleOnChange}
        checked={value}
      />
      <label className={styles.cbx} htmlFor="cbx">
        <span
          className={styles.cbx__icon}
          role="checkbox"
          tabIndex={0}
          onKeyPress={keypressHandler}
        >
          <svg width="20px" height="17px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span className={`${styles.cbx__label} ${className}`}>{label}</span>
      </label>
      {validationMessage && <div className={styles.inputField__error}>{validationMessage}</div>}
    </>
  );
};

export default CheckboxInput;
