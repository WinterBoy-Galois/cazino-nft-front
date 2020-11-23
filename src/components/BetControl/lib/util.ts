export const isValid = (value: string, min?: number, max?: number): boolean => {
  const v = Number(value);

  return (
    value !== '' && !isNaN(v) && (min === undefined || v >= min) && (max === undefined || v <= max)
  );
};
