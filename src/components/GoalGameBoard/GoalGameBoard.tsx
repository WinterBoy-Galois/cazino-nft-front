import React from 'react';
import styles from './GoalGameBoard.module.scss';
import clsx from 'clsx';
import GoalBall from '../icons/games/GoalBall';
import GoalBackground from '../icons/games/GoalBackground';
import GoalKeeper from '../icons/games/GoalKeeper';
import GoalMainBall from '../icons/games/GoalMainBall';
import { GoalGameState as GameState } from '../../models/goalGameState.model';

interface IProps {
  className?: string;
  gameState?: GameState;
  index?: number;
  handlePlaceBet?: (index: number) => void;
  selection?: number;
}

const GoalBallSelect: React.FC<IProps> = ({
  className,
  gameState,
  index = 0,
  handlePlaceBet = () => null,
}) => {
  return (
    <a
      className={clsx(className, styles.goal__selection__ball)}
      onClick={() => {
        if (gameState === GameState.IN_PROGRESS) handlePlaceBet(index);
      }}
    >
      <GoalBall className={className} gameState={gameState} />
    </a>
  );
};

const GoalGameBoard: React.FC<IProps> = props => {
  const { className, gameState, selection } = props;

  return (
    <div className={clsx(styles.container, className)}>
      <GoalBackground className={styles.goal__background} />
      <GoalKeeper {...props} className={clsx(styles.goal__keeper, styles.goal__keeper__idle)} />

      <div className={styles.goal__selection__container}>
        {Array.from(Array(3).keys()).map(index => (
          <GoalBallSelect
            {...props}
            className=""
            key={`ball-${index}`}
            index={index}
            gameState={selection === index ? gameState : GameState.IN_PROGRESS}
          />
        ))}
      </div>

      {gameState === GameState.IN_PROGRESS ? (
        <GoalMainBall className={clsx(styles.goal__main_ball)} />
      ) : null}
    </div>
  );
};

export default GoalGameBoard;
