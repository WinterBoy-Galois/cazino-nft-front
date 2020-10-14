import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

import styles from './TextInput.module.scss';

interface IProps {
  name?: string;
  value?: string;
  label?: string;
  validationMessage?: string;
  onChangeValue?: (value: string) => void;
  onBlur?: ({ target }: { target: EventTarget | null }) => void;
  disabled?: boolean;
}

const TextInput = ({
  name,
  value: initialValue,
  label,
  validationMessage,
  onChangeValue,
  onBlur,
  disabled,
}: IProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isError = () => {
    return !!validationMessage;
  };

  const handleOnChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value;

    setValue(newValue);
    if (onChangeValue) {
      onChangeValue(newValue);
    }
  };

  const keypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // refAmount?.current?.blur();
    }
  };

  const handleBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur && event) {
      onBlur(event);
    }
  };

  return (
    <div className={styles.inputField__container}>
      <div
        className={clsx(
          styles['inputField__wrapper'],
          isError() && styles['inputField__wrapper--error'],
          disabled && styles['inputField__wrapper--disabled']
        )}
      >
        <label className={styles.inputField__label}>{label}</label>
        <input
          {...(name ? { name: name } : {})}
          type="text"
          value={value}
          className={styles.inputField}
          autoComplete="off"
          onChange={handleOnChange}
          onKeyPress={keypressHandler}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
      {isError() && <div className={styles.inputField__error}>{validationMessage}</div>}
    </div>
  );
};

export default TextInput;
