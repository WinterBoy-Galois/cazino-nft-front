import { LocationProvider } from '@reach/router';
import React from 'react';
import DiceGame from '.';

export default {
  title: 'Components/DiceGame',
  component: DiceGame,
};

export const Default = () => (
  <LocationProvider>
    <DiceGame />
  </LocationProvider>
);
