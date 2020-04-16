// TIME: time, BET: bet/1000, MULTIPLIER: payout/4, PROFIT: profit/1000

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
  return `${value.toFixed(8)}`;
};

const formatBet = (value: number) => {
  const result = value / 1000;
  return `${result.toFixed(8)}`;
};

const formatMultiplier = (value: number) => {
  const result = value / 4;
  return `x${result.toFixed(3)}`;
};

const formatProfit = (value: number) => {
  const result = value / 1000;
  return result > 0 ? `+${result.toFixed(8)}` : `${result.toFixed(8)}`;
};

export { formatBet, formatMultiplier, formatProfit, formatBitcoin, formatBitcoinSmart };
