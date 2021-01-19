import React from 'react';
import GoalBallIdle from './GoalBallIdle';
import GoalBallWon from './GoalBallWon';
import GoalBallLost from './GoalBallLost';
import { GoalGameState as GameState } from '../../../../models/goalGameState.model';

interface IProps {
  className?: string;
  gameState?: GameState;
}

const GoalBall: React.FC<IProps> = ({ className, gameState }) => {
  if (gameState === GameState.WON) return <GoalBallWon className={className} />;

  if (gameState === GameState.LOST) return <GoalBallLost className={className} />;

  return <GoalBallIdle className={className} />;
};

export default GoalBall;
