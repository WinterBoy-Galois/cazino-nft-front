import React from 'react';
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
  lastSpot?: any;
  lastAdvanceStatus?: any;
  hideMiddleBall?: boolean;
}

const getGoalKeeperLostPosition = (selection: number, hideMiddleBall: boolean) =>
  (hideMiddleBall ? [0, 2] : [0, 1, 2])
    .filter(pos => pos != selection)
    .sort(() => Math.random() - 0.5)[0];

const GoalKeeper: React.FC<IProps> = ({
  className,
  lastSpot,
  lastAdvanceStatus,
  hideMiddleBall = false,
}) => {
  switch (lastAdvanceStatus) {
    case 'Won':
      const goalKeeperPosition = getGoalKeeperLostPosition(lastSpot, hideMiddleBall);

      if (goalKeeperPosition === 0)
        return <GoalKeeperLostLeft className={clsx(className, styles.goal_keeper__left)} />;
      if (goalKeeperPosition === 1)
        return <GoalKeeperLostMiddle className={clsx(className, styles.goal_keeper__middle)} />;
      if (goalKeeperPosition === 2)
        return <GoalKeeperLostRight className={clsx(className, styles.goal_keeper__right)} />;

      return null;

    case 'Lost':
      if (lastSpot === 0)
        return <GoalKeeperWonLeft className={clsx(className, styles.goal_keeper__left)} />;
      if (lastSpot === 1)
        return <GoalKeeperWonMiddle className={clsx(className, styles.goal_keeper__middle)} />;
      if (lastSpot === 2)
        return <GoalKeeperWonRight className={clsx(className, styles.goal_keeper__right)} />;

      return null;

    default:
      return <GoalKeeperIdle className={clsx(className, styles.goal_keeper__idle)} />;
  }
};

export default GoalKeeper;
