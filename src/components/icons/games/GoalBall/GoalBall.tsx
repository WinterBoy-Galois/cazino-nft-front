import React from 'react';
import GoalBallIdle from './GoalBallIdle';
import GoalBallWon from './GoalBallWon';
import GoalBallLost from './GoalBallLost';

interface IProps {
  className?: string;
  ballType?: string;
}

const GoalBall: React.FC<IProps> = ({ className, ballType }) => {
  switch (ballType) {
    case 'Won':
      return <GoalBallWon className={className} />;

    case 'Lost':
      return <GoalBallLost className={className} />;

    case 'Idle':
    default:
      return <GoalBallIdle className={className} />;
  }
};

export default GoalBall;
