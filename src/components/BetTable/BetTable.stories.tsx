import React, { useState, ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import BetTable from '.';
import Bet, { GameTypes } from '../../models/bet';
import { useBetGenerator } from './lib/useBetGenerator.hook';

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

interface IProps {
  isActive?: boolean;
  speed?: number;
  children?: ReactNode;
  currentUserId?: number;
  onBetAdded?: (bet: Bet) => void;
  onBetAddedForCurrentUser?: (bet: Bet) => void;
}

const RandomBetsConfiguration: React.FC<IProps> = ({
  isActive = false,
  speed = 1,
  children,
  onBetAdded,
}: IProps) => {
  useBetGenerator({ isActive, speed, users, onBetGenerated: onBetAdded });

  return <>{children}</>;
};

storiesOf('Components/BetTable', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const [bets, setBets] = useState<Bet[]>(initialBets);

    const handleBetAdded = (betAdded: Bet) => {
      const newBets = [betAdded, ...bets.slice(0, 9)];
      setBets(newBets);
    };

    const userDict = users.reduce(
      (acc: any, cur: any) => ({
        ...acc,
        [cur.name]: cur.id,
      }),
      {}
    );

    return (
      <div style={{ margin: '1rem' }}>
        <RandomBetsConfiguration
          isActive={boolean('Generate Data', true)}
          speed={number('Generation Speed', 1, { range: true, min: 1, max: 10, step: 1 })}
          currentUserId={select('Current User', userDict, 197)}
          onBetAdded={handleBetAdded}
          onBetAddedForCurrentUser={action('onBetAddedForCurrentUser')}
        >
          <BetTable
            bets={bets}
            speed={number('Max animated Bets', 1, { range: true, min: 1, max: 4, step: 1 })}
            isLoading={false}
            error={false}
          />
        </RandomBetsConfiguration>
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
