import React from 'react';
import { storiesOf } from '@storybook/react';
import UserInfoModal from '.';
import { action } from '@storybook/addon-actions';
import { ApolloError } from 'apollo-client';

const mockData = {
  userInfo: {
    __typename: 'PublicUser',
    id: '1',
    username: 'AuYHKS',
    avatarUrl: 'https://dev.gambilife.com/ava/m2.svg',
    totalWager: 0,
    totalProfit: 0,
    mostPlayed: 'CLAMS',
    totalBets: 27,
    luckyBets: 4,
  },
};

storiesOf('Components/UserInfoModal', module)
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
            avatarUrl: 'https://dev.gambilife.com/ava/ano.svg',
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
  });
