import React, { useState, useEffect } from 'react';

import styles from './TextInput.module.scss';

interface IProps {
  name?: string;
  value?: string;
  label?: string;
  validationMessage?: string;
  onChangeValue?: (value: string) => void;
  onBlur?: ({ target }: { target: EventTarget | null }) => void;
}

const TextInput = ({
  name = undefined,
  value: initialValue = undefined,
  label = undefined,
  validationMessage = undefined,
  onChangeValue = undefined,
  onBlur = undefined,
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
        className={
          !isError()
            ? `${styles['inputField__wrapper']}`
            : `${styles['inputField__wrapper']} ${styles['inputField__wrapper--error']}`
        }
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
        />
      </div>
      {isError() && <div className={styles.inputField__error}>{validationMessage}</div>}
    </div>
  );
};

export default TextInput;
