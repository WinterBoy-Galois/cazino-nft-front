import React from 'react';
import DiceGameBoard from '../../../../../DiceGameBoard';

interface IProps {
  result: number;
  rollOver: number;
  hasWon: boolean;
}

const DiceBetResults: React.FC<IProps> = props => {
  return <DiceGameBoard disabled {...props} />;
};

export default DiceBetResults;
