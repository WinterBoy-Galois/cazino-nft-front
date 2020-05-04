import Bet from '../../../models/bet';
import { useState } from 'react';

interface IProps {
  bufferSize?: number;
  onBetAddedForCurrentUser?: (bet: Bet) => void;
}

export const useBetBuffer = ({ bufferSize = 100, onBetAddedForCurrentUser }: IProps) => {
  const [bets, setBets] = useState<Bet[]>([]);

  const addBets = (addedBets: Bet[]) => {
    if (onBetAddedForCurrentUser) {
      addedBets.forEach(bet => {
        if (bet.userid === 121) {
          onBetAddedForCurrentUser(bet);
        }
      });
    }

    const newBets = bets
      ? [
          ...addedBets.slice(0, bufferSize - addedBets.length),
          ...bets.slice(0, bufferSize - addedBets.length),
        ]
      : [...addedBets.slice(0, bufferSize - addedBets.length)];
    setBets(newBets);
    return newBets;
  };

  return { bets, addBets };
};
