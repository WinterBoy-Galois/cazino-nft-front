import React from 'react';
import { GameTypes } from '../../models/gameTypes.model';
import Clams from '../icons/games/Clams';
import Dice from '../icons/games/Dice';
import Goals from '../icons/games/Goals';
import Mines from '../icons/games/Mines';

interface IProps {
  game: GameTypes;
  className?: string;
}

const GameIcon: React.FC<IProps> = ({ game, className }) => {
  switch (game) {
    case GameTypes.CLAMS:
      return <Clams className={className} />;
    case GameTypes.DICE:
      return <Dice className={className} />;
    case GameTypes.GOALS:
      return <Goals className={className} />;
    case GameTypes.MINES:
      return <Mines className={className} />;
    default:
      throw new Error(`Unknown game type: ${game}`);
  }
};

export default GameIcon;
