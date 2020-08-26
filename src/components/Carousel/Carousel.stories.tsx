import React from 'react';
import { storiesOf } from '@storybook/react';
import Layout from '../Layout';
import Carousel from '.';
import GameButtonList from '../GameButtonList';
import { LocationProvider } from '@reach/router';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { USER_INFO, USER_INFO_AVATAR_URL } from '../../graphql/queries';
import { BET_ADDED } from '../../graphql/subscriptions';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
const cache = new InMemoryCache({
  addTypename: false,
  fragmentMatcher,
});

const mockClient = createMockClient({ cache });
const queryHandler = () =>
  Promise.resolve({
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
  });
mockClient.setRequestHandler(USER_INFO, queryHandler);
mockClient.setRequestHandler(USER_INFO_AVATAR_URL, queryHandler);
mockClient.setRequestHandler(BET_ADDED, queryHandler);

storiesOf('Components/Carousel', module)
  .addDecorator(storyFn => <ApolloProvider client={mockClient}>{storyFn()}</ApolloProvider>)
  .add('default', () => <Carousel />)
  .add('with layout', () => (
    <LocationProvider>
      <Layout>
        <div className="container">
          <Carousel />
        </div>
        <div className="container">
          <GameButtonList />
        </div>
      </Layout>
    </LocationProvider>
  ));
