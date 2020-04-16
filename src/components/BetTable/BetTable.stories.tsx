import React from 'react';
import { storiesOf } from '@storybook/react';
import BetTable from '.';
import Bet, { GameTypes } from '../../models/bet';

const bets: Bet[] = [
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
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.CLAMS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.GOALS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.MINES,
    bet: 48.85313,
    profit: 48.85313,
  },
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
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.CLAMS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.GOALS,
    bet: 48.85313,
    profit: 48.85313,
  },
  {
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.MINES,
    bet: 48.85313,
    profit: 48.85313,
  },
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
    id: '1',
    time: 1582093456676,
    userid: 27,
    username: 'HaykFootball',
    gameid: GameTypes.CLAMS,
    bet: 48.85313,
    profit: 48.85313,
  },
];

storiesOf('Components/BetTable', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <BetTable bets={bets} isLoading={false} error={false} />
  </div>
));

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
