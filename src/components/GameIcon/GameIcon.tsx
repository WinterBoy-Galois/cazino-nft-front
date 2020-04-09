import React from 'react';
import { GameTypes } from '../../models/gameTypes.model';
import Clams from '../icons/games/Clams';
import Dice from '../icons/games/Dice';
import Goals from '../icons/games/Goals';
import Mines from '../icons/games/Mines';

interface IProps {
  game: GameTypes;
  className?: string;
  innerClassName?: string;
}

const GameIcon: React.SFC<IProps> = ({ game, className, innerClassName }) => {
  switch (game) {
    case 'CLAMS':
      return <Clams className={className} innerClassName={innerClassName} />;
    case 'DICE':
      return <Dice className={className} innerClassName={innerClassName} />;
    case 'GOALS':
      return <Goals className={className} innerClassName={innerClassName} />;
    case 'MINES':
      return <Mines className={className} innerClassName={innerClassName} />;
  }
};

export default GameIcon;
