import React from 'react';
import styles from './DiceGameBoard.module.scss';
import DiceResultScale from '../icons/DiceResultScale';
import Slider from '../Slider';

interface IProps {
  result: number;
  rollOver: number;
  disabled?: boolean;
}

const DiceGameBoard: React.FC<IProps> = ({ result, rollOver, disabled = false }) => {
  return (
    <div className={styles.container}>
      <DiceResultScale result={result.toFixed(2)} />
      <div className={styles.slider}>
        <Slider disabled={disabled} value={rollOver} />
      </div>
    </div>
  );
};

export default DiceGameBoard;
