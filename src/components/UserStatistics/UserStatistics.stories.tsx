import React from 'react';

import UserStatistics from '.';
import { GameTypes } from '../../models/gameTypes.model';

export default {
  title: 'Components/UserStatistics',
  component: UserStatistics,
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

export const Default = () => <UserStatistics userStatistic={data.userInfo} />;
