import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { appConfig } from '../../common/config';
import BetControl from '../BetControl';
import { isValid } from '../BetControl/lib/util';
import styles from './BetAmountControl.module.scss';
import { useStateValue } from '../../state';

interface IProps {
  className?: string;
  isControlDisable?: boolean;
  label?: string;
  min?: number;
  max?: number;
  amount?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

const BetAmountControl: React.FC<IProps> = props => {
  const {
    amount: initialAmount = 0.0004,
    isControlDisable,
    className,
    onChange,
    min = 0,
    max = 9,
    label,
    readonly,
  } = props;
  const [amount, setAmount] = useState(initialAmount);
  useEffect(() => setAmount(initialAmount), [initialAmount]);
  const [{ auth }] = useStateValue();
  const updateAmount = (value: number) => {
    setAmount(value);
    onChange && onChange(value);
  };

  const onHandleBlur = (value: number) => {
    if (auth.state === 'SIGNED_OUT') {
      // if no auth, set value zero
      updateAmount(0);
    } else if (value === 0) {
      // if value is 0 for auth user
      // it should be default value
      updateAmount(appConfig.defaultBetAmount);
    }
  };

  const handleHalve = () => {
    if (!readonly && auth.state === 'SIGNED_IN') {
      const newValue = amount / 2;
      if (!isValid(newValue, min, max)) {
        return updateAmount(min);
      }

      updateAmount(+newValue.toFixed(appConfig.bitcoinFractionDigits));
    }
  };

  const handleDouble = () => {
    if (!readonly && auth.state === 'SIGNED_IN') {
      const newValue = amount === 0 ? 10 ** -appConfig.bitcoinFractionDigits : amount * 2;

      if (!isValid(newValue, min, max)) {
        return updateAmount(max);
      }

      updateAmount(+newValue.toFixed(appConfig.bitcoinFractionDigits));
    }
  };

  return (
    <div className={styles.container}>
      <BetControl
        {...props}
        className={clsx(className, styles.control)}
        label={className?.includes('button_mine_game') ? 'Bet Amount' : label ?? 'Amount'}
        icon={'BITCOIN'}
        value={amount}
        decimalPlaces={appConfig.bitcoinFractionDigits}
        onChange={v => updateAmount(v)}
        onHandleBlur={onHandleBlur}
      />
      <button
        type="button"
        className={clsx(
          styles.button,
          !isControlDisable ? styles.bet_control_enable : styles.bet_control_disable
        )}
        onClick={handleHalve}
      >
        1/2
      </button>
      <button
        type="button"
        className={clsx(
          styles.button,
          !isControlDisable ? styles.bet_control_enable : styles.bet_control_disable
        )}
        onClick={handleDouble}
      >
        x2
      </button>
    </div>
  );
};

export default BetAmountControl;
