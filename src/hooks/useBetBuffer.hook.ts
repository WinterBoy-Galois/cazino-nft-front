import Bet from '../models/bet.model';
import { useState } from 'react';
import { useInterval } from './useInterval';

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
    switch (true) {
      case dispatchSpeed === DispatchSpeed.FAST:
      case dispatchSpeed === DispatchSpeed.AUTO &&
        bets.length > bufferSize / 20 &&
        bets.length <= bufferSize / 2: {
        return 500;
      }
      case dispatchSpeed === DispatchSpeed.VERY_FAST:
      case dispatchSpeed === DispatchSpeed.AUTO && bets.length >= bufferSize / 2: {
        return 250;
      }
      default: {
        return 1000;
      }
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
