import React from 'react';
import DiceCharacterIdle from '../../../../../components/icons/games/DiceCharacterIdle';
import DiceCharacterHitting from '../../../../../components/icons/games/DiceCharacterHitting';
import DiceCharacterHappy from '../../../../../components/icons/games/DiceCharacterHappy';
import DiceCharacterSad from '../../../../../components/icons/games/DiceCharacterSad';
import { DiceGameStatus } from '../DiceGame.types';

interface IProps {
  gameState: DiceGameStatus;
  className?: string;
}

const MapComponent = {
  [DiceGameStatus.IDLE]: DiceCharacterIdle,
  [DiceGameStatus.WON]: DiceCharacterHappy,
  [DiceGameStatus.LOST]: DiceCharacterSad,
  [DiceGameStatus.HITTING]: DiceCharacterHitting,
};

export const Character: React.FC<IProps> = ({ gameState, className }) => {
  const Component = MapComponent[gameState];
  return <Component className={className} />;
};
