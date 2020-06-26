import { appConfig } from '../config';

const { bitcoinFractionDigits, multiplierFractionDigits } = appConfig;

const formatBitcoin = (value?: number) => {
  if (!value) {
    value = 0;
  }

  return `${value.toFixed(bitcoinFractionDigits)}`;
};

const formatBet = (value?: number) => {
  if (!value) {
    return 'n/a';
  }

  return `${value.toFixed(bitcoinFractionDigits)}`;
};

const formatMultiplier = (value?: number) => {
  if (value !== 0 && !value) {
    return 'n/a';
  }

  return `x${value.toFixed(multiplierFractionDigits)}`;
};

const formatProfit = (value?: number) => {
  if (!value) {
    return 'n/a';
  }

  return value > 0
    ? `+${value.toFixed(bitcoinFractionDigits)}`
    : `${value.toFixed(bitcoinFractionDigits)}`;
};

/**
 * Assume if the value should be divided by 1.000
 */
const formatBitcoinSmart = (value?: string) => {
  if (!value) {
    return 'n/a';
  }

  if (value.includes('.')) {
    return formatBitcoin(parseFloat(value));
  }

  return formatBet(parseFloat(value) / 1000);
};

const formatWinChance = (value?: number) => {
  if (!value) {
    return 'n/a';
  }

  return `${value.toFixed(1)}%`;
};

export {
  formatBet,
  formatMultiplier,
  formatProfit,
  formatBitcoin,
  formatBitcoinSmart,
  formatWinChance,
};