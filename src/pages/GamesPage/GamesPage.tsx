import { Redirect, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { DiceGameWithData } from './components/DiceGame/DiceGame';
import { ClamGameWithData } from './components/ClamGame/ClamGame';
import { GoalGameWithData } from './components/GoalGame/GoalGame';
import { MineGameWithData } from './components/MineGame/MineGame';
const GamesPage: React.FC<RouteComponentProps> = () => {
  return (
    <Router>
      <DiceGameWithData path="dice" />
      <ClamGameWithData path="clam" />
      <GoalGameWithData path="goal" />
      <MineGameWithData path="mines" />
      <Redirect from="/" to="/notfound" default noThrow />
    </Router>
  );
};

export default GamesPage;
