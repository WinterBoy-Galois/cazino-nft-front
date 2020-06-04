import { appConfig } from '../config';

const fractionDigits = appConfig.bitcoinFractionDigits;

const formatBitcoin = (value?: number | null) => {
  if (!value) {
    value = 0;
  }

  return `${value.toFixed(fractionDigits)}`;
};

const formatBet = (value: number) => {
  return `${value.toFixed(fractionDigits)}`;
};

const formatMultiplier = (value: number) => {
  return `x${value.toFixed(3)}`;
};

const formatProfit = (value: number) => {
  return value > 0 ? `+${value.toFixed(fractionDigits)}` : `${value.toFixed(fractionDigits)}`;
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
