import React, { useEffect, useState } from 'react';
import styles from './BetControl.module.scss';
import clsx from 'clsx';
import { isValid, isNumber } from './lib/util';
import Icon from './components/Icon';
import { IconType } from './components/Icon/Icon';

interface IProps {
  label?: string;
  value?: number;
  className?: string;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  icon?: IconType;
  decimalPlaces?: number;
  readonly?: boolean;
  onClick?: () => void;
  onHandleBlur?: (value: number) => void;
}

const BetControl: React.FC<IProps> = ({
  label,
  value: defaultValue = 0.0,
  className,
  onChange,
  min = 0,
  max = 100,
  icon,
  decimalPlaces = 2,
  readonly,
  onClick,
  onHandleBlur = () => null,
}) => {
  const formatValue = (v: number) => v.toFixed(decimalPlaces);
  const [value, setValue] = useState(defaultValue);
  const [internalValue, setInternalValue] = useState(formatValue(defaultValue));
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) {
      setValue(defaultValue);
      setInternalValue(formatValue(defaultValue));
    }
  }, [defaultValue]);

  const handleChange = (newValue: string) => {
    if (!isNumber(newValue)) return;
    setEditing(true);
    setInternalValue(newValue);
    const val = newValue.toString().replace(',', '.');
    if (isValid(val, +min.toFixed(3), +max.toFixed(3))) {
      setValue(+val);
      onChange && onChange(+val);
    }
  };

  const handleBlur = () => {
    let newValue: number;

    if (min && +internalValue < min) {
      newValue = min;
    } else if (max && +internalValue > max) {
      newValue = max;
    } else {
      newValue = value;
    }

    setInternalValue(formatValue(newValue));
    setValue(+newValue);
    onChange && onChange(+newValue);

    setEditing(false);
    onHandleBlur(+internalValue);
  };

  return (
    <div
      className={clsx(styles.container, className, readonly && styles.readonly)}
      onClick={onClick}
    >
      <label htmlFor={label}>{label}</label>
      <div className={clsx(styles.container__value, readonly && styles.readonly)}>
        <Icon icon={icon} />
        <input
          id={label}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={internalValue}
          autoComplete="off"
          onChange={e => handleChange(e.target.value)}
          data-testid="value"
          onBlur={handleBlur}
          disabled={readonly}
        />
      </div>
    </div>
  );
};

export default BetControl;
