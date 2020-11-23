import React from 'react';
import styles from './DiceGameBoard.module.scss';
import DiceResultScale from '../icons/DiceResultScale';
import Slider from '../Slider';
import clsx from 'clsx';
import { DiceGameState } from '../../models/diceGameState.model';
import Character from './components/Character';

interface IProps {
  className?: string;
  result?: number;
  target?: number;
  disabled?: boolean;
  over?: boolean;
  onChangeTarget?: (target: number) => void;
  maxValue?: number;
  minValue?: number;
  gameState?: DiceGameState;
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
  gameState,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <DiceResultScale result={result} />
      <div className={styles.slider}>
        <Slider
          disabled={disabled}
          value={target}
          switchColors={over}
          onChange={onChangeTarget}
          onUpdate={onChangeTarget}
          maxValue={maxValue}
          minValue={minValue}
        />
      </div>
      <Character gameState={gameState ?? DiceGameState.IDLE} />
    </div>
  );
};

export default DiceGameBoard;
