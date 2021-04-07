import React from 'react';
import { RouteComponentProps } from '@reach/router';
import GameButtonList from '../../components/GameButtonList';
import Teaser from './components/Teaser';
import Carousel from '../../components/Carousel';

const HomePage: React.FC<RouteComponentProps> = () => {
  return (
    <div className="container-xs">
      <Carousel />
      <GameButtonList />
      <Teaser />
    </div>
  );
};

export default HomePage;
