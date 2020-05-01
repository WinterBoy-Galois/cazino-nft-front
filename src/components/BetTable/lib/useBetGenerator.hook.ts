// import Bet from '../../../models/bet';

export const useBetGenerator = () => {
  const start = () => console.log('Started...'); // tslint:disable-line
  const stop = () => console.log('Stopped!'); // tslint:disable-line

  return { start, stop };
};
