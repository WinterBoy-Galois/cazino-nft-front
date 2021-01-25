import React from 'react';
import styles from './GoalGameBoard.module.scss';
import clsx from 'clsx';
import GoalBall from '../icons/games/GoalBall';
import GoalBackground from '../icons/games/GoalBackground';
import GoalKeeper from '../icons/games/GoalKeeper';
import GoalMainBall from '../icons/games/GoalMainBall';
import { GoalGameState as GameState } from '../../models/goalGameState.model';

interface IDefaultProps {
  handlePlaceBet?: (index: number) => void;
  allowNext?: boolean;
}

interface IGBBProps extends IDefaultProps {
  className?: string;
  lastSpot?: any;
  lastAdvanceStatus?: any;
  hideMiddleBall?: boolean;
  gameState?: GameState;
}

interface IGBSProps extends IDefaultProps {
  index?: number;
  ballType?: string;
}

const GoalBallSelect: React.FC<IGBSProps> = ({
  index = 0,
  handlePlaceBet = () => null,
  allowNext,
  ballType,
}) => {
  return (
    <div
      className={clsx(styles.goal__selection__ball)}
      onClick={() => (allowNext ? handlePlaceBet(index) : null)}
    >
      <GoalBall
        className={clsx(
          styles.goal__selection__ball__svg,
          allowNext ? styles.goal__selection__ball__clickable : null
        )}
        ballType={ballType}
      />
    </div>
  );
};

const GoalGameBoard: React.FC<IGBBProps> = props => {
  const { className, allowNext, lastSpot, lastAdvanceStatus, hideMiddleBall, gameState } = props;

  return (
    <div className={clsx(styles.container, className)}>
      <GoalBackground className={styles.goal__background} />
      <GoalKeeper {...props} className={styles.goal__keeper} />

      {gameState === GameState.IN_PROGRESS ? (
        <div className={styles.goal__selection__container}>
          {Array.from(Array(3).keys()).map(index =>
            hideMiddleBall && index === 1 ? null : (
              <GoalBallSelect
                {...props}
                key={`ball-${index}`}
                index={index}
                ballType={lastSpot === index ? lastAdvanceStatus : 'Idle'}
              />
            )
          )}
        </div>
      ) : null}

      {allowNext && lastSpot === null ? (
        <GoalMainBall className={clsx(styles.goal__main_ball)} />
      ) : null}
    </div>
  );
};

export default GoalGameBoard;
