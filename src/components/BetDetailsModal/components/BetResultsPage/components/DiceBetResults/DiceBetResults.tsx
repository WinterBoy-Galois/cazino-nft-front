import React from 'react';
import DiceGameBoard from '../../../../../DiceGameBoard';

interface IProps {
  result: number;
  target: number;
  over: boolean;
}

const DiceBetResults: React.FC<IProps> = props => {
  return <DiceGameBoard disabled {...props} />;
};

export default DiceBetResults;
