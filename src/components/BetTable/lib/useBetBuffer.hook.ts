import Bet from '../../../models/bet';

export function useBetBuffer() {
  const addBets = (bets: Bet[]) => {
    return bets.length;
  };

  return { addBets };
}
