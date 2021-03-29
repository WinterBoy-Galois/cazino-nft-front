export const isValid = (value: string | number, min?: number, max?: number): boolean => {
  const v = Number(value);

  return (
    value !== '' && !isNaN(v) && (min === undefined || v >= min) && (max === undefined || v <= max)
  );
};

export const isNumber = (value: string | number): boolean => {
  if (value === '') return true;
  // i.e 1.xxx or 1,xxx
  const regex = new RegExp('\\d+([\\,\\.]\\d{0,8})?$');
  if (regex.test(value.toString())) {
    const ms = value.toString().match(regex);
    return ms?.[0] === ms?.input;
  }
  return false;
};
