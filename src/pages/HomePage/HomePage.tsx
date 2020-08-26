import React from 'react';
import { RouteComponentProps } from '@reach/router';
import GameButtonList from '../../components/GameButtonList';
import Teaser from './components/Teaser';
import Carousel from '../../components/Carousel';

const HomePage: React.SFC<RouteComponentProps> = () => {
  return (
    <div className="container">
      <Carousel />
      <GameButtonList />
      <Teaser />
    </div>
  );
};

export default HomePage;
