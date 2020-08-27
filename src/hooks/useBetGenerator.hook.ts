import { v4 as uuidv4 } from 'uuid';
import sample from 'lodash.sample';

import Bet from '../models/bet.model';
import { useInterval } from './useInterval';
import { GameTypes } from '../models/gameTypes.model';

// const randomEnum = <T extends any>(anEnum: T): T[keyof T] | undefined => {
//   if (anEnum === undefined) return undefined;

//   const enumValues = (Object.keys(anEnum)
//     .map(n => Number.parseInt(n, 10))
//     .filter(n => !Number.isNaN(n)) as unknown) as T[keyof T][];
//   const randomIndex = Math.floor(Math.random() * enumValues.length);
//   const randomEnumValue = enumValues[randomIndex];
//   return randomEnumValue;
// };

const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const generateRandomBet = (users?: any[]) => {
  // const randomGame = randomEnum(GameTypes);
  const randomGame = sample(Object.values(GameTypes)) as GameTypes;
  const randomUser =
    users && users.length > 0
      ? users[Math.floor(Math.random() * users.length)]
      : { id: 27, name: 'John Doe' };

  const result: Bet = {
    id: uuidv4(),
    time: new Date().getTime(),
    userid: randomUser.id,
    username: randomUser.name,
    gameid: randomGame,
    bet: randomNumber(0.01, 0.02),
    profit: randomNumber(-0.02, 0.02),
    multiplier: 1 / randomNumber(0.001, 0.98),
  };

  return result;
};

export const generateRandomBets = (count: number, users?: any[]) => {
  const bets: Bet[] = [];

  for (let _i = 0; _i < count; _i++) {
    bets.push(generateRandomBet(users));
  }

  return bets;
};

interface Settings {
  isActive?: boolean;
  speed?: number;
  betsPerBatch?: number;
  users?: any[];
  onBetsGenerated?: (bets: Bet[]) => void;
}

export const useBetGenerator = ({
  isActive = false,
  speed = 1000,
  betsPerBatch = 1,
  users = [],
  onBetsGenerated,
}: Settings) => {
  useInterval(
    () => {
      const betsAdded = generateRandomBets(betsPerBatch, users);
      if (onBetsGenerated) {
        onBetsGenerated(betsAdded);
      }
    },
    isActive ? speed : null
  );

  return;
};
