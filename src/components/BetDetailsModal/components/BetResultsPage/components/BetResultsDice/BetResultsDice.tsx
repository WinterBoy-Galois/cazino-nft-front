import React from 'react';
import styles from './BetResultsDice.module.scss';
import DiceResultScale from '../../../../../icons/DiceResultScale';

const BetResultsDice: React.FC = () => {
  return (
    <div className={styles.container}>
      <DiceResultScale result="45.66" />
    </div>
  );
};

export default BetResultsDice;
