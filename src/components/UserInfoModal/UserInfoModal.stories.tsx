import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ApolloError } from '@apollo/client';

import UserInfoModal from '.';
import { appConfig } from '../../common/config';

const mockData = {
  userInfo: {
    __typename: 'PublicUser',
    id: '1',
    username: 'AuYHKS',
    avatarUrl: `${appConfig.apiBasePath}/ava/m1.svg`,
    totalWager: 0,
    totalProfit: 0,
    mostPlayed: 'CLAMS',
    totalBets: 27,
    luckyBets: 4,
  },
};

storiesOf('Components/UserInfoModal', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <UserInfoModal
        show={true}
        data={mockData}
        loading={false}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  })
  .add('anonymous user', () => {
    return (
      <UserInfoModal
        show={true}
        data={{
          ...mockData,
          userInfo: {
            ...mockData.userInfo,
            avatarUrl: `${appConfig.apiBasePath}/ava/m1.svg`,
            username: null,
            totalWager: null,
            totalProfit: null,
          },
        }}
        // data={mockData}
        loading={false}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  })
  .add('User not found', () => {
    return (
      <UserInfoModal
        show={true}
        data={{
          userInfo: {
            __typename: 'GenericErrorArray',
            errors: [{ type: '', field: '', messageKey: '' }],
          },
        }}
        loading={false}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  })
  .add('loading', () => {
    return (
      <UserInfoModal
        show={true}
        data={undefined}
        loading={true}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  })
  .add('graphlQL error', () => {
    return (
      <UserInfoModal
        show={true}
        data={{
          userInfo: { __typename: 'GenericErrorArray', errors: [{ message: 'GraphQL Error' }] },
        }}
        loading={false}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  })
  .add('network error', () => {
    return (
      <UserInfoModal
        show={true}
        data={null}
        loading={false}
        error={new ApolloError({ networkError: new Error('Network error') })}
        onClose={action('close modal')}
      />
    );
  })
  .add('custom', () => {
    const customData = {
      userInfo: {
        __typename: 'PublicUser',
        id: '1',
        avatarUrl: text('Avatar URL', `${appConfig.apiBasePath}/ava/m1.svg`),
        username: text('Username:', 'AuYHKS'),
        totalWager: number('Total Wager:', 0),
        totalProfit: number('Total Profit:', 0),
        mostPlayed: select(
          'Most played',
          {
            Dice: 'DICE',
            Goals: 'GOALS',
            Mines: 'MINES',
            Clams: 'CLAMS',
          },
          'CLAMS'
        ),
        totalBets: number('Total Bets:', 27),
        luckyBets: number('Won Bets:', 4),
      },
    };

    return (
      <UserInfoModal
        show={true}
        data={customData}
        loading={boolean('Loading', false)}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  });
