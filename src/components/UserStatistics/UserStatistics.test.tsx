import React from 'react';
import { render } from '@testing-library/react';
import UserStatistics from '.';
import { GameTypes } from '../../models/gameTypes.model';

const userInfo = {
  id: '1',
  totalWager: 0,
  totalProfit: 0,
  mostPlayed: GameTypes.CLAMS,
  totalBets: 27,
  luckyBets: 4,
};

describe('UserStatistics', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<UserStatistics userStatistic={userInfo} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
