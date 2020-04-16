// TIME: time, BET: bet/1000, MULTIPLIER: payout/4, PROFIT: profit/1000
import { appConfig } from '../config';

const fractionDigits = appConfig.bitcoinFractionDigits;

/**
 * Assume if the value should be divided by 1.000
 */
const formatBitcoinSmart = (value: string) => {
  if (value.includes('.')) {
    return formatBitcoin(parseFloat(value));
  }

  return formatBet(parseFloat(value));
};

const formatBitcoin = (value: number) => {
  return `${value.toFixed(fractionDigits)}`;
};

const formatBet = (value: number) => {
  const result = value / 1000;
  return `${result.toFixed(fractionDigits)}`;
};

const formatMultiplier = (value: number) => {
  const result = value / 4;
  return `x${result.toFixed(3)}`;
};

const formatProfit = (value: number) => {
  const result = value / 1000;
  return result > 0 ? `+${result.toFixed(fractionDigits)}` : `${result.toFixed(fractionDigits)}`;
};

export { formatBet, formatMultiplier, formatProfit, formatBitcoin, formatBitcoinSmart };
