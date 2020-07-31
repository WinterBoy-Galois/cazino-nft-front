import React from 'react';
import { storiesOf } from '@storybook/react';
import TopBar from '.';
import { StateProvider } from '../../../../state';
import { action } from '@storybook/addon-actions';

storiesOf('Components/TopBar', module)
  .add('default', () => <TopBar />)
  .add('with Signed-in user', () => (
    <StateProvider
      state={{
        sidebar: {
          isOpen: false,
          selectedTab: 'LATEST_BETS',
          selectedLeaderboardAggregation: 'DAILY',
        },
        modal: {
          type: 'NONE',
        },
        auth: {
          state: 'SIGNED_IN',
          accessToken: 'token',
          user: {
            id: '123',
            isActivated: true,
            username: 'testuser',
            avatarUrl: 'https://dev.gambilife.com/ava/m1.svg',
          },
        },
        referral: {},
      }}
    >
      <TopBar onSignOutClick={action('Sign-out')} />
    </StateProvider>
  ));
