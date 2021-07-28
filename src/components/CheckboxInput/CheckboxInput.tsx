import React, { useState, useEffect } from 'react';

import styles from './CheckboxInput.module.scss';

interface IProps {
  name?: string;
  label?: string;
  className?: string;
  validationMessage?: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
  onBlur?: ({ target }: { target: EventTarget | null }) => void;
}

const CheckboxInput: React.FC<IProps> = ({
  name,
  label,
  className = '',
  validationMessage,
  value: initialValue = false,
  onChangeValue,
  onBlur,
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

  const handleBlur = (event?: React.FocusEvent<any>) => {
    if (onBlur && event) {
      onBlur(event);
    }
  };

  const keypressHandler = (event: React.KeyboardEvent<any>) => {
    const isEnterOrSpace = event.key === ' ' || event.key === 'Enter';

    if (isEnterOrSpace) {
      handleOnChange();
    }
  };

  return (
    <>
      <input
        className={styles['inp-cbx']}
        id="cbx"
        type="checkbox"
        onChange={handleOnChange}
        checked={value}
        onBlur={handleBlur}
      />
      <label className={styles.cbx} htmlFor="cbx">
        <span
          id={name}
          className={styles.cbx__icon}
          role="checkbox"
          aria-checked={value}
          tabIndex={0}
          onKeyPress={keypressHandler}
          onBlur={handleBlur}
        >
          <svg width="20px" height="17px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1" />
          </svg>
        </span>
        <span className={`${styles.cbx__label} ${className}`}>{label}</span>
      </label>
      {validationMessage && <div className={styles.inputField__error}>{validationMessage}</div>}
    </>
  );
};

export default CheckboxInput;
