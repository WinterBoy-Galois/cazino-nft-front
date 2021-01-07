import { LocationProvider } from '@reach/router';
import React from 'react';
import ClamGame from '.';

export default {
  title: 'Components/ClamGame',
  component: ClamGame,
};

export const Default = () => (
  <LocationProvider>
    <ClamGame />
  </LocationProvider>
);
