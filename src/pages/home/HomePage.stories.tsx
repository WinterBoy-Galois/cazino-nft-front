import React from 'react';
import { storiesOf } from '@storybook/react';
import Teaser from '.';
import { LocationProvider } from '@reach/router';
import Layout from '../../components/Layout';

storiesOf('Pages/Home', module).add('default', () => (
  <LocationProvider>
    <Layout>
      <Teaser />
    </Layout>
  </LocationProvider>
));
