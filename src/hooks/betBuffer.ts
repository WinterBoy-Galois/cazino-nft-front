import Bet from '../models/bet.model';

const addToArray = (buffer: Bet[], elements: Bet[]) => {
  elements.forEach(element => {
    buffer.push(element);
  });
  return buffer;
};

const countCurrentUserBets = (buffer: Bet[], userId: number) => {
  const result = buffer.reduce((counter, { userid }) => {
    return userid === userId ? counter + 1 : counter;
  }, 0);

  return result;
};

export { addToArray, countCurrentUserBets };
