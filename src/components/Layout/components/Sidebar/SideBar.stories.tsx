import React from 'react';
import { storiesOf } from '@storybook/react';
import SideBar from '.';
import { MockedProvider } from '@apollo/client/testing';

import { BET_ADDED } from '../../../../graphql/subscriptions';

const mocks = [
  {
    request: {
      query: BET_ADDED,
    },
    result: {
      data: {
        betAdded: {
          id: '155689',
          time: 1589971668258,
          userid: 59,
          username: 'pamela56',
          gameid: 'CLAMS',
          bet: 0.00001028,
          profit: -0.00001028,
          multiplier: 1.45,
        },
      },
    },
  },
];

storiesOf('Components/SideBar', module)
  .addDecorator(storyFn => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {storyFn()}
    </MockedProvider>
  ))
  .add('default', () => <SideBar />);
