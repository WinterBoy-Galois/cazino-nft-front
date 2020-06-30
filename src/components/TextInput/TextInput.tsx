import React, { useState, useEffect } from 'react';

import './TextInput.scss';

interface IProps {
  value?: string;
  label?: string;
  onChangeAmount?: (quantity: number) => void;
}

const TextInput = ({ value: initialValue = undefined, label = undefined }: IProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const changeAmount = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  };

  const keypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // refAmount?.current?.blur();
    }
  };

  return (
    <div className="inputField__container">
      <div className="inputField__wrapper">
        <label className="inputFieldLabel">{label}</label>
        <input
          type="text"
          value={value}
          className="inputField"
          autoComplete="off"
          onChange={changeAmount}
          onKeyPress={keypressHandler}
        />
      </div>
    </div>
  );
};

export default TextInput;
