import { appConfig } from '../config';

const { bitcoinFractionDigits, multiplierFractionDigits } = appConfig;

const formatBitcoin = (value?: number | null) => {
  if (!value) {
    value = 0;
  }

  return `${value.toFixed(bitcoinFractionDigits)}`;
};

const formatBet = (value: number) => {
  return `${value.toFixed(bitcoinFractionDigits)}`;
};

const formatMultiplier = (value: number) => {
  return `x${value.toFixed(multiplierFractionDigits)}`;
};

const formatProfit = (value: number) => {
  return value > 0
    ? `+${value.toFixed(bitcoinFractionDigits)}`
    : `${value.toFixed(bitcoinFractionDigits)}`;
};

/**
 * Assume if the value should be divided by 1.000
 */
const formatBitcoinSmart = (value: string) => {
  if (value.includes('.')) {
    return formatBitcoin(parseFloat(value));
  }

  return formatBet(parseFloat(value) / 1000);
};

export { formatBet, formatMultiplier, formatProfit, formatBitcoin, formatBitcoinSmart };
