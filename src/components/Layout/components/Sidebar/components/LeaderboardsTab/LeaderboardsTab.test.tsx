import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import LeaderboardsTab from './LeaderboardsTab';
import { LEADERBOARDS_SUBSCRIPTION } from '../../../../../../graphql/subscriptions';
import { LEADERBOARDS } from '../../../../../../graphql/queries';

const mocks = [
  {
    request: {
      query: LEADERBOARDS,
    },
    result: {
      data: { leaderboards: { daily: [], weekly: [], monthly: [] } },
    },
  },
  {
    request: {
      query: LEADERBOARDS_SUBSCRIPTION,
    },
    result: {
      data: { leaderboardChanged: { daily: [], weekly: [], monthly: [] } },
    },
  },
];

describe('LeaderboardsTab', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LeaderboardsTab />
      </MockedProvider>
    );

    await waitForDomChange();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
