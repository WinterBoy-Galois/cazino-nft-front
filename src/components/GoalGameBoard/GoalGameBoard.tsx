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
  index?: number;
  handlePlaceBet?: (index: number) => void;
}

const GoalBallSelect: React.FC<IProps> = ({
  className,
  gameState,
  index = 0,
  handlePlaceBet = () => null,
}) => {
  if (gameState === GameState.IN_PROGRESS)
    return (
      <a
        className={clsx(className, styles.goal__selection__ball)}
        onClick={() => handlePlaceBet(index)}
      >
        <GoalBall className={className} />
      </a>
    );

  return null;
};

const GoalGameBoard: React.FC<IProps> = props => {
  const { className, gameState } = props;

  return (
    <div className={clsx(styles.container, className)}>
      <GoalBackground className={styles.goal__background} />
      <GoalKeeperIdle className={clsx(styles.goal__keeper, styles.goal__keeper__idle)} />

      <div className={styles.goal__selection__container}>
        {Array.from(Array(3).keys()).map(index => (
          <GoalBallSelect {...props} className="" key={`ball-${index}`} index={index} />
        ))}
      </div>

      {gameState === GameState.IN_PROGRESS ? (
        <GoalMainBall className={clsx(styles.goal__main_ball)} />
      ) : null}
    </div>
  );
};

export default GoalGameBoard;
