import React from 'react';
import styles from './DiceGameBoard.module.scss';
import DiceResultScale from '../icons/DiceResultScale';
import Slider from '../Slider';
import happyCharacter from '../../assets/images/games/dice/dice-char-happy.svg';
import sadCharacter from '../../assets/images/games/dice/dice-char-sad.svg';

interface IProps {
  result?: number;
  target?: number;
  disabled?: boolean;
  over?: boolean;
}

const DiceGameBoard: React.FC<IProps> = ({
  result = 0,
  target = 0,
  disabled = false,
  over = false,
}) => {
  const hasWon = over ? result >= target : result <= target;

  return (
    <div className={styles.container}>
      <DiceResultScale result={result.toFixed(2)} />
      <div className={styles.slider}>
        <Slider disabled={disabled} value={target} switchColors={over} />
      </div>
      <div className={styles.character}>
        <img src={hasWon ? happyCharacter : sadCharacter} alt={hasWon ? 'happy' : 'sad'} />
      </div>
    </div>
  );
};

export default DiceGameBoard;