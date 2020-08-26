import React from 'react';
import Layout from '../Layout';
import Carousel from '.';
import GameButtonList from '../GameButtonList';
import { LocationProvider } from '@reach/router';
import { MockedProvider } from '@apollo/client/testing';
import { BET_ADDED } from '../../graphql/subscriptions';

const mocks = [
  {
    request: {
      query: BET_ADDED,
    },
    result: {
      data: {},
    },
  },
];

export default {
  title: 'Components/Carousel',
  component: Carousel,
  decorators: [
    (storyFn: () => React.ReactElement) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {storyFn()}
      </MockedProvider>
    ),
  ],
};

export const Default = () => <Carousel />;

export const WithLayout = () => (
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
);
