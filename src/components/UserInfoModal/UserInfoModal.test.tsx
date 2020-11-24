import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UserInfoModalWithData } from './UserInfoModal';
import { USER_INFO } from '../../graphql/queries';
import { GameTypes } from '../../models/gameTypes.model';
import { LocationProvider } from '@reach/router';

const mocks = [
  {
    request: {
      query: USER_INFO,
      variables: { userId: '1' },
    },
    result: {
      data: {
        userInfo: {
          __typename: 'PublicUser',
          id: '1',
          username: 'NIDHjQ',
          avatarUrl: 'https://test.de/ava/m1.svg',
          totalWager: 0,
          totalProfit: 0,
          mostPlayed: GameTypes.CLAMS,
          totalBets: 0,
          luckyBets: 0,
        },
      },
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
          <UserInfoModalWithData show={true} userId="1" />
        </MockedProvider>
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
