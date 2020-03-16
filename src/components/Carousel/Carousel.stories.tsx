import React from 'react';
import { storiesOf } from '@storybook/react';
import Layout from '../Layout';
import Carousel from '.';
import GameButtonList from '../GameButtonList';
import { LocationProvider } from '@reach/router';

storiesOf('Components/Carousel', module)
  .add('default', () => <Carousel />)
  .add('with layout', () => (
    <LocationProvider>
      <Layout>
        <div className="container">
          <Carousel />
        </div>{' '}
        <div className="container">
          <GameButtonList />
        </div>
      </Layout>
    </LocationProvider>
  ));
