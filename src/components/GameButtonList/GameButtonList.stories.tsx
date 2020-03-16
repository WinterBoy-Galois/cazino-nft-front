import React from 'react';
import { storiesOf } from '@storybook/react';
import GameButtonList from '.';
import { LocationProvider } from '@reach/router';

storiesOf('Components/GameButtons', module).add('default', () => (
  <LocationProvider>
    <div className="container">
      <GameButtonList />
    </div>
  </LocationProvider>
));
