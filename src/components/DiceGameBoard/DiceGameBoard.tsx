import React from 'react';
import styles from './DiceGameBoard.module.scss';
import DiceResultScale from '../icons/DiceResultScale';
import Slider from '../Slider';

const DiceGameBoard: React.FC = () => {
  return (
    <div className={styles.container}>
      <DiceResultScale result="45.66" />
      <div className={styles.slider}>
        <Slider />
      </div>
    </div>
  );
};

export default DiceGameBoard;
