import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import LeaderboardsTab from './LeaderboardsTab';
import { LEADERBOARDS_SUBSCRIPTION } from '../../../../../../graphql/subscriptions';
import { LEADERBOARDS } from '../../../../../../graphql/queries';
import { LocationProvider } from '@reach/router';

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
      <LocationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <LeaderboardsTab />
        </MockedProvider>
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
