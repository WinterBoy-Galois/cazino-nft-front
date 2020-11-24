import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { appConfig } from '../../common/config';
import BetControl from '../BetControl';
import { isValid } from '../BetControl/lib/util';
import styles from './BetAmountControl.module.scss';

interface IProps {
  className?: string;
  min?: number;
  max?: number;
  amount?: number;
  onChange?: (value: number) => void;
}

const BetAmountControl: React.FC<IProps> = props => {
  const { amount: initialAmount = 0.0004, className, onChange, min = 0, max = 9 } = props;
  const [amount, setAmount] = useState(initialAmount);
  useEffect(() => setAmount(initialAmount), [initialAmount]);

  const updateAmount = (value: number) => {
    setAmount(value);
    onChange && onChange(value);
  };

  const handleHalve = () => {
    const newValue = amount / 2;

    if (!isValid(newValue, min, max)) {
      return setAmount(min);
    }

    updateAmount(+newValue.toFixed(appConfig.bitcoinFractionDigits));
  };

  const handleDouble = () => {
    const newValue = amount * 2;

    if (!isValid(newValue, min, max)) {
      return setAmount(max);
    }

    updateAmount(+newValue.toFixed(appConfig.bitcoinFractionDigits));
  };

  return (
    <div className={styles.container}>
      <BetControl
        {...props}
        className={clsx(className, styles.control)}
        label={'Amount'}
        icon={'BITCOIN'}
        value={amount}
        decimalPlaces={appConfig.bitcoinFractionDigits}
        onChange={v => updateAmount(v)}
      />
      <button type="button" className={styles.button} onClick={handleHalve}>
        1/2
      </button>
      <button type="button" className={styles.button} onClick={handleDouble}>
        x2
      </button>
    </div>
  );
};

export default BetAmountControl;
