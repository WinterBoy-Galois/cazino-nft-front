import GoalBallWon from '../../../../../components/icons/games/GoalBall/GoalBallWon';
import GoalBallLost from '../../../../../components/icons/games/GoalBall/GoalBallLost';
import GoalBallIdle from '../../../../../components/icons/games/GoalBall/GoalBallIdle';
import React from 'react';

interface IProps {
  className?: string;
  ballType: 'idle' | 'lost' | 'won';
  onClick?: () => void;
}

const BallComponentMap = {
  won: GoalBallWon,
  lost: GoalBallLost,
  idle: GoalBallIdle,
};

export const GoalBall: React.FC<IProps> = ({ ballType, ...props }) => {
  const Component = BallComponentMap[ballType] || GoalBallIdle;

  return <Component {...props} />;
};
