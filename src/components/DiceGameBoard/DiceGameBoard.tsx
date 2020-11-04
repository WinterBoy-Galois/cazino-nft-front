import React from 'react';
import styles from './DiceGameBoard.module.scss';
import DiceResultScale from '../icons/DiceResultScale';
import Slider from '../Slider';
import happyCharacter from '../../assets/images/games/dice/dice-char-happy.svg';
import sadCharacter from '../../assets/images/games/dice/dice-char-sad.svg';
import clsx from 'clsx';
import { formatGameResult } from '../../common/util/format.util';

interface IProps {
  className?: string;
  result?: number;
  target?: number;
  disabled?: boolean;
  over?: boolean;
  onChangeTarget?: (target: number) => void;
  maxValue?: number;
  minValue?: number;
}

const DiceGameBoard: React.FC<IProps> = ({
  className,
  result = 0,
  target = 50,
  disabled = false,
  over = false,
  onChangeTarget,
  maxValue,
  minValue,
}) => {
  const hasWon = over ? result >= target : result < target;

  return (
    <div className={clsx(styles.container, className)}>
      <DiceResultScale result={formatGameResult(result)} />
      <div className={styles.slider}>
        <Slider
          disabled={disabled}
          value={target}
          switchColors={over}
          onChange={onChangeTarget}
          maxValue={maxValue}
          minValue={minValue}
        />
      </div>
      {result ? (
        <div className={styles.character}>
          <img src={hasWon ? happyCharacter : sadCharacter} alt={hasWon ? 'happy' : 'sad'} />
        </div>
      ) : null}
    </div>
  );
};

export default DiceGameBoard;
