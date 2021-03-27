import React, { useState } from 'react';
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
  isCashOut?: boolean;
}

interface IGBSProps extends IDefaultProps {
  index?: number;
  ballType?: string;
  onPlaceBet?: (index: number) => void;
}

const GoalBallSelect: React.FC<IGBSProps> = ({
  index = 0,
  onPlaceBet = () => null,
  allowNext,
  ballType,
}) => {
  return (
    <div
      className={clsx(styles.goal__selection__ball)}
      onClick={() => (allowNext ? onPlaceBet(index) : null)}
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
  const {
    className,
    allowNext,
    lastSpot,
    lastAdvanceStatus,
    hideMiddleBall,
    gameState,
    isCashOut,
    handlePlaceBet = () => null,
  } = props;

  const [goalKeeperPosition, setGKP] = useState(-1);

  const onSelectPlaceBet = (index: number) => {
    setGKP(getGoalKeeperLostPosition(index));
    handlePlaceBet(index);
  };

  const renderGoalBallSelections = () => {
    if (isCashOut && !allowNext) return;

    if (gameState === GameState.IN_PROGRESS)
      return (
        <div className={styles.goal__selection__container}>
          {Array.from(Array(3).keys()).map(index =>
            hideMiddleBall && index === 1 ? null : (
              <GoalBallSelect
                {...props}
                onPlaceBet={onSelectPlaceBet}
                key={`ball-${index}`}
                index={index}
                ballType={lastSpot === index ? lastAdvanceStatus : 'Idle'}
              />
            )
          )}
        </div>
      );
  };

  const getGoalKeeperLostPosition = (selection: number) =>
    selection === 1 ? [0, 2].sort(() => Math.random() - 0.5)[0] : selection === 0 ? 2 : 0;

  // old goalKeeperPosition
  // const getGoalKeeperLostPosition = (selection: number, hideMiddleBall?: boolean) =>
  //   (hideMiddleBall ? [0, 2] : [0, 1, 2])
  //     .filter(pos => pos != selection)
  //     .sort(() => Math.random() - 0.5)[0];

  return (
    <div className={clsx(styles.container, className)}>
      <GoalBackground className={styles.goal__background} />
      <GoalKeeper
        {...props}
        goalKeeperPosition={goalKeeperPosition}
        className={styles.goal__keeper}
      />

      {renderGoalBallSelections()}

      {allowNext && lastSpot === null ? (
        <GoalMainBall className={clsx(styles.goal__main_ball)} />
      ) : null}
    </div>
  );
};

export default GoalGameBoard;
