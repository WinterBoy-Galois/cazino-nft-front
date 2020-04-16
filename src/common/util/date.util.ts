const defaultDateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
const defaultTimeOptions = {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Europe/Berlin',
};

const defaultLocale = 'de-DE';

const dateFromEpoch = (value: number) => {
  const result = new Intl.DateTimeFormat(defaultLocale, defaultDateOptions).format(value);
  return result;
};

const timeFromEpoch = (value: number) => {
  const result = new Intl.DateTimeFormat(defaultLocale, defaultTimeOptions).format(value);
  return result;
};

const datetimeFromEpoch = (value: number) => {
  const result = `${dateFromEpoch(value)} ${timeFromEpoch(value)}`;
  return result;
};

export { datetimeFromEpoch, dateFromEpoch, timeFromEpoch };
