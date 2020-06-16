import React from 'react';
import { render } from '@testing-library/react';
import GoalsBetResults from '.';

describe('GoalsBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <GoalsBetResults selections={[{ step: 0, luckySpots: [0, 2], selected: 0 }]} />
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
