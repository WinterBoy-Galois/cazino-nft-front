const isPositive = (value: string) => {
  return value.startsWith('+');
};

const isNegative = (value: string) => {
  return value.startsWith('-');
};

export { isPositive, isNegative };
