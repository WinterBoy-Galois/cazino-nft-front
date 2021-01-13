import { LocationProvider } from '@reach/router';
import React from 'react';
import GoalGame from '.';

export default {
  title: 'Components/GoalGame',
  component: GoalGame,
};

export const Default = () => (
  <LocationProvider>
    <GoalGame />
  </LocationProvider>
);
