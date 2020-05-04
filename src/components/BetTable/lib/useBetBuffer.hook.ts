import Bet from '../../../models/bet';
import { useState } from 'react';

export const useBetBuffer = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  const addBets = (addedBets: Bet[]) => {
    const newBets = bets ? [...bets, ...addedBets] : [...addedBets];
    setBets(newBets);
    return newBets;
  };

  return { bets, addBets };
};
