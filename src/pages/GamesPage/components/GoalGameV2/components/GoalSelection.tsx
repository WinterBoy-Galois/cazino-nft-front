import React, { useCallback } from 'react';
import { useGenerateBallsArray } from '../GoalGame.utils';
import { Ball } from '../GoalGame.styles';
import { GoalSelectionProps } from '../GoalGame.types';

export const GoalSelection: React.FC<GoalSelectionProps> = ({ ballAmount, placeBet }) => {
  const balls = useGenerateBallsArray(ballAmount);
  const onSelect = useCallback((index: number) => () => placeBet(index), [placeBet]);
  return (
    <>
      {balls.map(item => (
        <Ball key={`ball-${item}`} ballType="idle" onClick={onSelect(item)} />
      ))}
    </>
  );
};
