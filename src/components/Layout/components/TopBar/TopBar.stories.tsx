import React from 'react';
import { storiesOf } from '@storybook/react';
import TopBar from '.';
import { StateProvider } from '../../../../state';
import { action } from '@storybook/addon-actions';
import { State } from '../../../../state/models';

const state: State = {
  sidebar: {
    isOpen: false,
    isChatBot: true,
    isSound: true,
    selectedTab: 'LATEST_BETS',
    selectedLeaderboardAggregation: 'DAILY',
  },
  modal: {
    type: 'NONE',
  },
  referral: {},
};

storiesOf('Components/TopBar', module)
  .add('default', () => <TopBar />)
  .add('with Signed-in user', () => (
    <StateProvider state={state}>
      <TopBar onSignOutClick={action('Sign-out')} />
    </StateProvider>
  ));
