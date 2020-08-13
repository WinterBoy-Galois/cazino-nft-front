import React from 'react';
import { storiesOf } from '@storybook/react';
import { LocationProvider } from '@reach/router';
import ProfilePage from './ProfilePage';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Pages/Profile', module).add('default', () => (
  <LocationProvider>
    <ProfilePage
      statisticsLoading={boolean('StatisticsLoading', false)}
      securityLoading={boolean('SecurityLoading', false)}
    />
  </LocationProvider>
));
