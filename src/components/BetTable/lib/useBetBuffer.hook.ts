import Bet from '../../../models/bet';
import { useState, useEffect } from 'react';
import { useInterval } from '../../../hooks/useInterval';

export enum DispatchSpeed {
  AUTO,
  NORMAL = 1000,
  FAST = 500,
  VERY_FAST = 250,
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

  const calculateSpeed = () => {
    switch (dispatchSpeed) {
      case DispatchSpeed.FAST ||
        (DispatchSpeed.AUTO && bets.length > bufferSize / 10 && bets.length < bufferSize / 2):
        return 500;
      case DispatchSpeed.VERY_FAST || (DispatchSpeed.AUTO && bets.length > bufferSize / 2):
        return 250;
      default:
        return 1000;
    }
  };

  useInterval(() => {
    if (bets.length > 0) {
      const betToDispatch = bets.shift();
      if (onBetDispatched && betToDispatch) {
        onBetDispatched(betToDispatch);
      }
    }
  }, calculateSpeed());

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
