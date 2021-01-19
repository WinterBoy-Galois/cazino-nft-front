import React from 'react';
import { GoalGameState as GameState } from '../../../../models/goalGameState.model';
import clsx from 'clsx';
import styles from './GoalKeeper.module.scss';
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

      if (goalKeeperPosition === 0)
        return <GoalKeeperLostLeft className={clsx(className, styles.goal_keeper__left)} />;
      if (goalKeeperPosition === 1)
        return <GoalKeeperLostMiddle className={clsx(className, styles.goal_keeper__middle)} />;
      if (goalKeeperPosition === 2)
        return <GoalKeeperLostRight className={clsx(className, styles.goal_keeper__right)} />;

      return null;

    case GameState.LOST:
      if (selection === 0)
        return <GoalKeeperWonLeft className={clsx(className, styles.goal_keeper__left)} />;
      if (selection === 1)
        return <GoalKeeperWonMiddle className={clsx(className, styles.goal_keeper__middle)} />;
      if (selection === 2)
        return <GoalKeeperWonRight className={clsx(className, styles.goal_keeper__right)} />;

      return null;

    default:
      return <GoalKeeperIdle className={className} />;
  }
};

export default GoalKeeper;
