import React from 'react';
import { GoalGameState as GameState } from '../../../../models/goalGameState.model';
import GoalKeeperIdle from './GoalKeeperIdle';
import GoalKeeperWonLeft from './GoalKeeperWonLeft';
import GoalKeeperLostLeft from './GoalKeeperLostLeft';
import GoalKeeperLostMiddle from './GoalKeeperLostMiddle';
import GoalKeeperWonMiddle from './GoalKeeperWonMiddle';
import GoalKeeperLostRight from './GoalKeeperLostRight';
import GoalKeeperWonRight from './GoalKeeperWonRight';

interface IProps {
  className?: string;
  gameState?: GameState;
  selection?: number;
}

const getGoalKeeperLostPosition = (selection: number) =>
  [0, 1, 2].filter(pos => pos != selection).sort(() => Math.random() - 0.5)[0];

const GoalKeeper: React.FC<IProps> = ({
  className,
  gameState = GameState.IDLE,
  selection = -1,
}) => {
  switch (gameState) {
    case GameState.WON:
      const goalKeeperPosition = getGoalKeeperLostPosition(selection);

      if (goalKeeperPosition === 0) return <GoalKeeperLostLeft className={className} />;
      if (goalKeeperPosition === 1) return <GoalKeeperLostMiddle className={className} />;
      if (goalKeeperPosition === 2) return <GoalKeeperLostRight className={className} />;

      return null;

    case GameState.LOST:
      if (selection === 0) return <GoalKeeperWonLeft className={className} />;
      if (selection === 1) return <GoalKeeperWonMiddle className={className} />;
      if (selection === 2) return <GoalKeeperWonRight className={className} />;

      return null;

    default:
      return <GoalKeeperIdle className={className} />;
  }
};

export default GoalKeeper;
