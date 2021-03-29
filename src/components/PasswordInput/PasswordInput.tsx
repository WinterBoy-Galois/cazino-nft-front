import React, { useState, useEffect } from 'react';

import styles from './PasswordInput.module.scss';
import { Eye, EyeInvisible } from '..';

interface IProps {
  name?: string;
  value?: string;
  label?: string;
  validationMessage?: string;
  isForcePasswordVisible?: boolean;
  onChangeValue?: (value: string) => void;
  onBlur?: ({ target }: { target: EventTarget | null }) => void;
  onChangePasswordVisible?: (value: boolean) => void;
}

const PasswordInput = ({
  name,
  value: initialValue,
  label,
  validationMessage,
  isForcePasswordVisible,
  onChangeValue,
  onBlur,
  onChangePasswordVisible,
}: IProps) => {
  const [value, setValue] = useState(initialValue);
  const [isPasswordVisible, setIsPasswordVisible] = useState(isForcePasswordVisible || false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isForcePasswordVisible != null) {
      setIsPasswordVisible(isForcePasswordVisible);
    }
  }, [isForcePasswordVisible]);

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

  const handleBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur && event) {
      onBlur(event);
    }
  };

  const handleClick = () => {
    const visible = !isPasswordVisible;
    setIsPasswordVisible(visible);
    onChangePasswordVisible && onChangePasswordVisible(visible);
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
        <div className={styles.inputField__group}>
          <label className={styles.inputField__label}>{label}</label>
          <input
            {...(name ? { name: name } : {})}
            type={isPasswordVisible ? 'text' : 'password'}
            value={value}
            className={styles.inputField}
            autoComplete="off"
            onChange={handleOnChange}
            onBlur={handleBlur}
          />
        </div>
        <button
          type="button"
          className={`${styles['inputField__icon']}`}
          onClick={handleClick}
          tabIndex={-1}
        >
          {isPasswordVisible ? (
            <Eye className={`${styles['inputField__icon--visible']}`} />
          ) : (
            <EyeInvisible className={`${styles['inputField__icon--invisible']}`} />
          )}
        </button>
      </div>
      {isError() && <div className={styles.inputField__error}>{validationMessage}</div>}
    </div>
  );
};

export default PasswordInput;
