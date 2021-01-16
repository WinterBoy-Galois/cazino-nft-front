import React from 'react';
import styles from './GoalGameBoard.module.scss';
import clsx from 'clsx';
import GoalBall from '../icons/games/GoalBall';
import GoalBackground from '../icons/games/GoalBackground';
import GoalKeeperIdle from '../icons/games/GoalKeeperIdle';
import GoalMainBall from '../icons/games/GoalMainBall';
import { GoalGameState as GameState } from '../../models/goalGameState.model';

interface IProps {
  className?: string;
  gameState?: GameState;
}

const GoalBallSelect: React.FC<IProps> = ({ className, gameState }) => {
  if (gameState === GameState.IN_PROGRESS)
    return <GoalBall className={clsx(className, styles.goal__selection__ball)} />;

  return null;
};

const GoalGameBoard: React.FC<IProps> = ({ className, gameState }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <GoalBackground className={styles.goal__background} />
      <GoalKeeperIdle className={clsx(styles.goal__keeper, styles.goal__keeper__idle)} />

      <div className={styles.goal__selection__container}>
        <GoalBallSelect gameState={gameState} />
        <GoalBallSelect gameState={gameState} />
        <GoalBallSelect gameState={gameState} />
      </div>

      {gameState === GameState.IN_PROGRESS ? (
        <GoalMainBall className={clsx(styles.goal__main_ball)} />
      ) : null}
    </div>
  );
};

export default GoalGameBoard;
