import React from 'react';
import { DiceGameState } from '../../../../models/diceGameState.model';
import styles from './Character.module.scss';
import clsx from 'clsx';
import DiceCharacterIdle from '../../../icons/games/DiceCharacterIdle';
import DiceCharacterHitting from '../../../icons/games/DiceCharacterHitting';
import DiceCharacterHappy from '../../../icons/games/DiceCharacterHappy';
import DiceCharacterSad from '../../../icons/games/DiceCharacterSad';

interface IProps {
  gameState: DiceGameState;
}

const Character: React.FC<IProps> = ({ gameState }) => {
  switch (gameState) {
    case DiceGameState.IDLE:
      return <DiceCharacterIdle className={styles.character} />;

    case DiceGameState.WON:
      return <DiceCharacterHappy className={styles.character} />;

    case DiceGameState.LOST:
      return <DiceCharacterSad className={styles.character} />;

    case DiceGameState.HITTING:
      return <DiceCharacterHitting className={clsx(styles.character, styles.character__hitting)} />;

    default:
      throw new Error(`Unknown GameState: ${gameState}`);
  }
};

export default Character;
