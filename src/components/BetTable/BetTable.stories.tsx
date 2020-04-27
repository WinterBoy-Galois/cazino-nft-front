import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import BetTable from '.';
import Bet, { GameTypes } from '../../models/bet';

const initialBets: Bet[] = [
  {
    id: '1',
    time: 1582093459133,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.DICE,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '2',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.CLAMS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '3',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.GOALS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '4',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.MINES,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '5',
    time: 1582093459133,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.DICE,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '6',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.CLAMS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '7',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.GOALS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '8',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.MINES,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '9',
    time: 1582093459133,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.DICE,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '10',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.CLAMS,
    bet: 48.85313,
    profit: 48.85313,
  },
];

const users: any = [
  {
    id: 197,
    name: 'ashleypowell',
  },
  {
    id: 121,
    name: 'martinezmark',
  },
  {
    id: 139,
    name: 'heather73',
  },
  {
    id: 183,
    name: 'timothy78',
  },
  {
    id: 169,
    name: 'vgonzalez',
  },
  {
    id: 195,
    name: 'morsekevin',
  },
  {
    id: 179,
    name: 'mullinswalter',
  },
  {
    id: 133,
    name: 'aconley',
  },
  {
    id: 184,
    name: 'sdixon',
  },
  {
    id: 191,
    name: 'johnstanley',
  },
];

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

const generateRandomBet = (id: number) => {
  const randomGame = randomEnum(GameTypes);
  const randomUser = users[Math.floor(Math.random() * users.length)];

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

storiesOf('Components/BetTable', module).add('default', () => {
  const [counter, setCounter] = useState(11);
  const [bets, setBets] = useState<Bet[]>(initialBets);

  useEffect(() => {
    setTimeout(() => {
      const newCounter = counter + 1;
      const betAdded = generateRandomBet(counter);
      const newBets = [betAdded, ...bets.slice(0, 9)];
      setBets(newBets);
      setCounter(newCounter);
    }, 1000);
  }, [counter]);

  return (
    <div style={{ margin: '1rem' }}>
      <BetTable bets={bets} isLoading={false} error={false} />
    </div>
  );
});

storiesOf('Components/BetTable', module).add('empty', () => (
  <div style={{ margin: '1rem' }}>
    <BetTable bets={[]} isLoading={false} error={false} />
  </div>
));

storiesOf('Components/BetTable', module).add('error', () => (
  <div style={{ margin: '1rem' }}>
    <BetTable bets={[]} isLoading={false} error={true} />
  </div>
));

storiesOf('Components/BetTable', module).add('loading', () => (
  <div style={{ margin: '1rem' }}>
    <BetTable bets={[]} isLoading={true} error={false} />
  </div>
));
