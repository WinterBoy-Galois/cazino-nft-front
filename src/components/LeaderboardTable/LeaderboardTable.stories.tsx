import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import LeaderboardTable from '.';
import { shuffle } from '../../common/util';
import { action } from '@storybook/addon-actions';

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
  {
    username: 'dailychampion7',
    userid: '9',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
  {
    username: 'dailychampion8',
    userid: '10',
    wager: 0.12345678,
    bonus: 0.321321401,
  },
];

const LeaderboardTableWrapper = () => {
  const [leaderboard, setLeaderboard] = useState(data);

  return (
    <>
      <LeaderboardTable
        error={false}
        isLoading={false}
        leaderboard={leaderboard}
        signInUserId="5"
      />
      <button onClick={() => setLeaderboard(shuffle(data))}>shuffle</button>
    </>
  );
};

storiesOf('Components/LeaderboardTable', module)
  .add('default', () => (
    <LeaderboardTable
      error={false}
      isLoading={false}
      leaderboard={data}
      signInUserId="5"
      onRowClicked={action('Row clicked')}
      onUsernameClicked={action('Username clicked')}
    />
  ))
  .add('shuffle data', () => <LeaderboardTableWrapper />)
  .add('empty', () => (
    <LeaderboardTable
      error={false}
      isLoading={false}
      leaderboard={[]}
      signInUserId="5"
      onRowClicked={action('Row clicked')}
      onUsernameClicked={action('Username clicked')}
    />
  ))
  .add('loading', () => (
    <LeaderboardTable error={false} isLoading={true} leaderboard={[]} signInUserId="5" />
  ))
  .add('error', () => (
    <LeaderboardTable error={true} isLoading={false} leaderboard={[]} signInUserId="5" />
  ))
  .add('signed in user not in leaderboard', () => (
    <LeaderboardTable
      error={false}
      isLoading={false}
      leaderboard={data}
      signInUserId="-1"
      onRowClicked={action('Row clicked')}
      onUsernameClicked={action('Username clicked')}
    />
  ))
  .add('scrolling', () => (
    <div style={{ height: '250px' }}>
      <LeaderboardTable
        error={false}
        isLoading={false}
        leaderboard={data}
        signInUserId="5"
        onRowClicked={action('Row clicked')}
        onUsernameClicked={action('Username clicked')}
      />
    </div>
  ))
  .addDecorator(storyFn => (
    <div className="container" style={{ height: '500px' }}>
      {storyFn()}
    </div>
  ));
