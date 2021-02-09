import { LocationProvider } from '@reach/router';
import React from 'react';
import MineGame from '.';

export default {
  title: 'Components/MineGame',
  component: MineGame,
};

export const Default = () => (
  <LocationProvider>
    <MineGame />
  </LocationProvider>
);
