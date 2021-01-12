import React from 'react';
import styles from './GoalGameBoard.module.scss';
import clsx from 'clsx';
import GoalBackground from '../icons/games/GoalBackground';
import GoalKeeperIdle from '../icons/games/GoalKeeperIdle';

interface IProps {
  className?: string;
}

const GoalGameBoard: React.FC<IProps> = ({ className }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className="goal-container">
        <GoalBackground className={styles.goal__background} />
        <GoalKeeperIdle className={clsx(styles.goal__keeper, styles.goal__keeper__idle)} />
      </div>
    </div>
  );
};

export default GoalGameBoard;
