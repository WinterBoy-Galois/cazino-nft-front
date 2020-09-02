import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import SideBar from './SideBar';
import { BET_ADDED } from '../../../../graphql/subscriptions';
import { RECENT_BETS } from '../../../../graphql/queries';

const mocks = [
  {
    request: {
      query: RECENT_BETS,
    },
    result: {
      data: {
        recentBets: {
          allBets: [
            {
              id: '816380',
              time: 1598013566307,
              userid: 478,
              username: 'williamsjohn',
              gameid: 'GOALS',
              bet: 0.00006406,
              profit: 0.00013324,
              multiplier: 3.08,
            },
          ],
          myBets: null,
        },
      },
    },
  },
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
          multiplier: 0,
        },
      },
    },
  },
];

describe('SideBar', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SideBar />
      </MockedProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
