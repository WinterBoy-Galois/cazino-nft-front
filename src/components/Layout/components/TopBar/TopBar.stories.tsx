import React from 'react';
import { storiesOf } from '@storybook/react';
import TopBar from '.';
import { StateProvider } from '../../../../state';
import { action } from '@storybook/addon-actions';
import { appConfig } from '../../../../common/config';

storiesOf('Components/TopBar', module)
  .add('default', () => <TopBar />)
  .add('with Signed-in user', () => (
    <StateProvider
      state={{
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
        auth: {
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
      }}
    >
      <TopBar onSignOutClick={action('Sign-out')} />
    </StateProvider>
  ));
