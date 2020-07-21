const defaultDateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
const defaultTimeOptions = {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const defaultLocale = navigator.language ?? (navigator as any).userLanguage;

const dateFromEpoch = (value: number) => {
  const result = new Intl.DateTimeFormat(defaultLocale, defaultDateOptions).format(value);
  return result;
};

const dateFromEpochShort = (value: number) => {
  const result = new Intl.DateTimeFormat(defaultLocale, {
    ...defaultDateOptions,
    year: '2-digit',
  }).format(value);
  return result;
};

const timeFromEpoch = (value: number) => {
  const result = new Intl.DateTimeFormat(defaultLocale, defaultTimeOptions).format(value);
  return result;
};

const timeFromEpochShort = (value: number) => {
  const result = new Intl.DateTimeFormat(defaultLocale, {
    ...defaultTimeOptions,
    second: undefined,
  }).format(value);
  return result;
};

const datetimeFromEpoch = (value: number) => {
  const result = `${dateFromEpoch(value)} ${timeFromEpoch(value)}`;
  return result;
};

const datetimeFromEpochShort = (value: number) => {
  const result = `${dateFromEpochShort(value)} ${timeFromEpoch(value)}`;
  return result;
};

const getEpoch = () => +new Date() / 1000;
export {
  dateFromEpoch,
  dateFromEpochShort,
  timeFromEpoch,
  timeFromEpochShort,
  datetimeFromEpoch,
  datetimeFromEpochShort,
  getEpoch,
};
