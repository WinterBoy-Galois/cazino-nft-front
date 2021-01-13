import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { DiceGameWithData } from './components/DiceGame/DiceGame';
import { ClamGameWithData } from './components/ClamGame/ClamGame';
import { GoalGameWithData } from './components/GoalGame/GoalGame';

const GamesPage: React.FC<RouteComponentProps> = () => {
  return (
    <Router>
      <DiceGameWithData path="dice" />
      <ClamGameWithData path="clam" />
      <GoalGameWithData path="goal" />
    </Router>
  );
};

export default GamesPage;
