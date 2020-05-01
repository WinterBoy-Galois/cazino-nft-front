import { useState, useEffect } from 'react';

import Bet, { GameTypes } from '../../../models/bet';

const randomEnum = <T extends any>(anEnum: T): T[keyof T] => {
  const enumValues = (Object.keys(anEnum)
    .map(n => Number.parseInt(n, 10))
    .filter(n => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
};

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const generateRandomBet = (id: number, users: any[]) => {
  const randomGame = randomEnum(GameTypes);
  const randomUser =
    users.length > 0
      ? users[Math.floor(Math.random() * users.length)]
      : { id: 27, name: 'John Doe' };

  const result: Bet = {
    id: id.toString(),
    time: new Date().getTime(),
    userid: randomUser.id,
    username: randomUser.name,
    gameid: randomGame,
    bet: randomNumber(0.01, 0.02),
    profit: randomNumber(-0.02, 0.02),
  };

  return result;
};

interface Settings {
  isActive?: boolean;
  speed?: number;
  users?: any[];
  onBetGenerated?: (bet: Bet) => void;
}

export const useBetGenerator = ({
  isActive = false,
  speed = 1,
  users = [],
  onBetGenerated,
}: Settings) => {
  const [counter, setCounter] = useState(11);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        const newCounter = counter + 1;
        const betAdded = generateRandomBet(counter, users);
        if (onBetGenerated) {
          onBetGenerated(betAdded);
        }
        setCounter(newCounter);
      }, 1000 / speed);
    }

    return () => clearInterval(interval);
  });

  return;
};
