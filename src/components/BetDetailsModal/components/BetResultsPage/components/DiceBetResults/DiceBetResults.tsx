import React, { useMemo } from 'react';
import { DiceGameState } from '../../../../../../models/diceGameState.model';
import DiceGameBoard from '../../../../../DiceGameBoard';

interface IProps {
  result: number;
  target: number;
  over: boolean;
}

const DiceBetResults: React.FC<IProps> = props => {
  const { over, target, result } = props;
  const gameState = useMemo(
    () => ((over ? result >= target : result < target) ? DiceGameState.WON : DiceGameState.LOST),
    [over, target, result]
  );

  return <DiceGameBoard disabled {...props} gameState={gameState} />;
};

export default DiceBetResults;
