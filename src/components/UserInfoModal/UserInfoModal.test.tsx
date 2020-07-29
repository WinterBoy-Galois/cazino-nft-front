import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { UserInfoModalWithData } from './UserInfoModal';
import { USER_INFO } from '../../graphql/queries';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { GameTypes } from '../../models/gameTypes.model';
import { LocationProvider } from '@reach/router';

describe('LeaderboardsTab', () => {
  it('should match snapshot', async () => {
    // Arrange
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    });

    const cache = new InMemoryCache({
      addTypename: false,
      fragmentMatcher,
    });

    const mockClient = createMockClient({ cache });
    const queryHandler = jest.fn().mockResolvedValue({
      data: {
        userInfo: {
          __typename: 'PublicUser',
          id: '1',
          username: 'NIDHjQ',
          avatarUrl: 'https://dev.gambilife.com/ava/m1.svg',
          totalWager: 0,
          totalProfit: 0,
          mostPlayed: GameTypes.CLAMS,
          totalBets: 0,
          luckyBets: 0,
        },
      },
    });
    mockClient.setRequestHandler(USER_INFO, queryHandler);

    // Act
    const container = render(
      <LocationProvider>
        <ApolloProvider client={mockClient}>
          <UserInfoModalWithData show={true} userId="1" />
        </ApolloProvider>
      </LocationProvider>
    );

    await waitForDomChange();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
