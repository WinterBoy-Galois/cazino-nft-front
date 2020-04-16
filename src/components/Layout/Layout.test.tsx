import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';
import { ApolloProvider } from '@apollo/react-hooks';
import { USER_INFO } from '../../graphql/queries';
import { createMockClient } from 'mock-apollo-client';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';

describe('Layout', () => {
  it('should match snapshot', () => {
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
          mostPlayed: 'DICE',
          totalBets: 0,
          luckyBets: 0,
        },
      },
    });
    mockClient.setRequestHandler(USER_INFO, queryHandler);

    // Act
    const container = render(
      <ApolloProvider client={mockClient}>
        <Layout />
      </ApolloProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
