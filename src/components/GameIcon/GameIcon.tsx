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

const GameIcon: React.SFC<IProps> = ({ game, className }) => {
  switch (game) {
    case 'CLAMS':
      return <Clams className={className} />;
    case 'DICE':
      return <Dice className={className} />;
    case 'GOALS':
      return <Goals className={className} />;
    case 'MINES':
      return <Mines className={className} />;
  }
};

export default GameIcon;
