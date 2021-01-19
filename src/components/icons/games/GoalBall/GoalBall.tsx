import React from 'react';
import GoalBallIdle from './GoalBallIdle';

interface IProps {
  className?: string;
}

const GoalBall: React.FC<IProps> = ({ className }) => {
  return <GoalBallIdle className={className} />;
};

export default GoalBall;
