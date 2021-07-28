import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { appConfig } from '../../common/config';
import BetControl from '../BetControl';
import styles from './WithdrawAmountControl.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  className?: string;
  max?: number;
  amount?: number;
  onChange?: (value: number) => void;
}

const WithdrawAmountControl: React.FC<IProps> = props => {
  const { t } = useTranslation(['components']);
  const { amount: initialAmount = 0.0004, className, onChange, max = 9 } = props;
  const [amount, setAmount] = useState(initialAmount);
  useEffect(() => setAmount(initialAmount), [initialAmount]);

  const updateAmount = (value: number) => {
    if (value > max) handleMax();
    else setAmount(value);

    onChange && onChange(value);
  };

  const handleMax = () => {
    updateAmount(+max.toFixed(appConfig.bitcoinFractionDigits));
  };

  return (
    <div className={styles.container}>
      <BetControl
        {...props}
        className={clsx(className, styles.control)}
        label={t('withdrawAmountControl.amount')}
        icon={'BITCOIN'}
        value={amount}
        decimalPlaces={appConfig.bitcoinFractionDigits}
        onChange={v => updateAmount(v)}
      />
      <button type="button" className={styles.button} onClick={handleMax}>
        {t('withdrawAmountControl.max')}
      </button>
    </div>
  );
};

export default WithdrawAmountControl;
