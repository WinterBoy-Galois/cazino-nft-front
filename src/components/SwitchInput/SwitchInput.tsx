import React, { useEffect, useState } from 'react';
import styles from './SwitchInput.module.scss';

interface IProps {
  className?: string;
  label?: string;
  id?: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
}

const SwitchInput: React.FC<IProps> = ({
  className = '',
  label = 'label',
  id = 'id',
  value: initialValue = false,
  onChangeValue,
}) => {
  const [value, setValue] = useState<boolean>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;

    setValue(newValue);
    if (onChangeValue) {
      onChangeValue(newValue);
    }
  };

  return (
    <div className={`custom-control custom-switch ${styles.container}${className}`}>
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        onChange={handleOnChange}
        checked={value}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default SwitchInput;
