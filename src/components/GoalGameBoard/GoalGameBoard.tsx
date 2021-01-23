import React from 'react';
import styles from './GoalGameBoard.module.scss';
import clsx from 'clsx';
import GoalBall from '../icons/games/GoalBall';
import GoalBackground from '../icons/games/GoalBackground';
import GoalKeeper from '../icons/games/GoalKeeper';
import GoalMainBall from '../icons/games/GoalMainBall';

interface IGBBProps {
  className?: string;
  handlePlaceBet?: (index: number) => void;
  allowNext?: boolean;
  lastSpot?: any;
  lastAdvanceStatus?: any;
}

interface IGBSProps extends IGBBProps {
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
  const { className, allowNext, lastSpot, lastAdvanceStatus } = props;

  return (
    <div className={clsx(styles.container, className)}>
      <GoalBackground className={styles.goal__background} />
      <GoalKeeper {...props} className={styles.goal__keeper} />

      <div className={styles.goal__selection__container}>
        {Array.from(Array(3).keys()).map(index => (
          <GoalBallSelect
            {...props}
            key={`ball-${index}`}
            index={index}
            ballType={lastSpot === index ? lastAdvanceStatus : 'Idle'}
          />
        ))}
      </div>

      {allowNext && lastSpot === null ? (
        <GoalMainBall className={clsx(styles.goal__main_ball)} />
      ) : null}
    </div>
  );
};

export default GoalGameBoard;
