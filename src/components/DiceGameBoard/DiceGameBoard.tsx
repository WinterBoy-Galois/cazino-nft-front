import React from 'react';
import styles from './DiceGameBoard.module.scss';
import DiceResultScale from '../icons/DiceResultScale';

const DiceGameBoard: React.FC = () => {
  return (
    <div className={styles.container}>
      <DiceResultScale result="45.66" />
    </div>
  );
};

export default DiceGameBoard;
