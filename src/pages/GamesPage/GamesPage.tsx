import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { DiceGameWithData } from './components/DiceGame/DiceGame';
import { ClamGameWithData } from './components/ClamGame/ClamGame';

const GamesPage: React.FC<RouteComponentProps> = () => {
  return (
    <Router>
      <DiceGameWithData path="dice" />
      <ClamGameWithData path="clam" />
    </Router>
  );
};

export default GamesPage;
