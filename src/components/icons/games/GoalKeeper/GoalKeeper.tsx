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
  goalKeeperPosition?: number;
  hideMiddleBall?: boolean;
}

const GoalKeeper: React.FC<IProps> = ({
  className,
  lastSpot: defaultSpot,
  lastAdvanceStatus,
  goalKeeperPosition,
  hideMiddleBall,
}) => {
  const lastSpot = hideMiddleBall === true && defaultSpot === 1 ? 2 : defaultSpot;
  switch (lastAdvanceStatus) {
    case 'Won':
      // const goalKeeperPosition = getGoalKeeperLostPosition(lastSpot, hideMiddleBall);

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
