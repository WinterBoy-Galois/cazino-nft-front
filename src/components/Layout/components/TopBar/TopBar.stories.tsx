import React from 'react';
import { storiesOf } from '@storybook/react';
import TopBar from '.';
import { StateProvider } from '../../../../state';
import { action } from '@storybook/addon-actions';
import { appConfig } from '../../../../common/config';
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
  newAuth: {
    relogin: false,
    state: 'SIGNED_IN',
    accessToken: 'token',
    user: {
      id: '123',
      isActivated: true,
      username: 'testuser',
      avatarUrl: `${appConfig.apiBasePath}/ava/m1.svg`,
    },
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
