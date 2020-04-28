import Bet from '../../../models/bet';

const addToArray = (buffer: Bet[], elements: Bet[]) => {
  elements.forEach(element => {
    buffer.push(element);
  });
  return buffer;
};

const countCurrentUserBets = (buffer: Bet[], userId: number) => {
  const result = buffer.filter(item => {
    return item.userid === userId;
  }).length;

  return result;
};

export { addToArray, countCurrentUserBets };
