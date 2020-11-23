import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { DiceGameWithData } from './components/DiceGame/DiceGame';

const GamesPage: React.FC<RouteComponentProps> = () => {
  return (
    <Router>
      <DiceGameWithData path="dice" />
    </Router>
  );
};

export default GamesPage;
