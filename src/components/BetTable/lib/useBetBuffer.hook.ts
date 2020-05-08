import Bet from '../../../models/bet';
import { useState, useEffect } from 'react';

export enum DispatchSpeed {
  AUTO,
  NORMAL,
  FAST,
  VERY_FAST,
}

interface IProps {
  bufferSize?: number;
  dispatchSpeed?: DispatchSpeed;
  onBetDispatched?: (bet: Bet) => void;
  currentUserId?: number;
  onBetAddedForCurrentUser?: (bet: Bet) => void;
}

export const useBetBuffer = ({
  bufferSize = 100,
  dispatchSpeed = DispatchSpeed.NORMAL,
  onBetDispatched,
  currentUserId,
  onBetAddedForCurrentUser,
}: IProps) => {
  const [bets, setBets] = useState<Bet[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      if (bets.length > 0) {
        const betToDispatch = bets.shift();
        if (onBetDispatched && betToDispatch) {
          onBetDispatched(betToDispatch);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const addBets = (addedBets: Bet[]) => {
    if (currentUserId && onBetAddedForCurrentUser) {
      addedBets.forEach(bet => {
        if (bet.userid === currentUserId) {
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
