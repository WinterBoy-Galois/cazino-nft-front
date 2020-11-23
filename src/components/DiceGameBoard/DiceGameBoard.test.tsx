import React from 'react';
import { render } from '@testing-library/react';
import DiceGameBoard from '.';
import { DiceGameState } from '../../models/diceGameState.model';

describe('DiceGameBoard', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <DiceGameBoard result={55} target={65} gameState={DiceGameState.WON} />
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
