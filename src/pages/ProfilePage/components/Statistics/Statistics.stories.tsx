import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Statistics from '.';
import { GameTypes } from '../../../../models/gameTypes.model';

export default {
  title: 'Components/Profile/Statistics',
  component: Statistics,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ minHeight: '200px' }}>{storyFn()}</div>,
  ],
};

const data = {
  userInfo: {
    totalWager: 0,
    totalProfit: 0,
    mostPlayed: GameTypes.CLAMS,
    totalBets: 27,
    luckyBets: 4,
    hideUsername: true,
    hideTotalProfit: false,
    hideTotalWager: false,
  },
};

export const Default = () => (
  <Statistics
    loading={boolean('Loading', false)}
    userStatistic={data.userInfo}
    error={boolean('Error', false)}
  />
);
