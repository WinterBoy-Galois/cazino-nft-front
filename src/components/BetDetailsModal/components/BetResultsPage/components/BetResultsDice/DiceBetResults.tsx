import React from 'react';
import DiceGameBoard from '../../../../../DiceGameBoard';

interface IProps {
  result: number;
  rollOver: number;
}

const DiceBetResults: React.FC<IProps> = props => {
  return <DiceGameBoard disabled {...props} />;
};

export default DiceBetResults;
