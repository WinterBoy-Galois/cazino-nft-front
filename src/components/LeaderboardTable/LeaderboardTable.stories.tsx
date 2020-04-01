import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import LeaderboardTable from '.';
import { shuffle } from '../../common/util';

const data = [
  {
    username: 'dailychampion1',
    userid: '1',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion2',
    userid: '2',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion3',
    userid: '3',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion4',
    userid: '4',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion5',
    userid: '5',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion6',
    userid: '6',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion7',
    userid: '7',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion8',
    userid: '8',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
];

const Wrapper = () => {
  const [leaderboard, setLeaderboard] = useState(data);

  return (
    <>
      <LeaderboardTable error={false} isLoading={false} leaderboard={leaderboard} />
      <button onClick={() => setLeaderboard(shuffle(data))}>shuffle</button>
    </>
  );
};

storiesOf('Components/LeaderboardTable', module).add('default', () => (
  <div className="container">
    <Wrapper />
  </div>
));
