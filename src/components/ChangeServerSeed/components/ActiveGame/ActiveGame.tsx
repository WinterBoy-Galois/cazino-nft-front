import React from 'react';
import { GameTypes } from '../../../../models/gameTypes.model';
import GameIcon from '../../../GameIcon';
import styles from './ActiveGame.module.scss';

interface IProps {
  game: GameTypes;
}

const ActiveGame: React.FC<IProps> = ({ game }) => {
  return (
    <div className={styles.container}>
      <GameIcon game={game} className={styles.icon} />
      <span className={styles.title}>{game}</span>
    </div>
  );
};

export default ActiveGame;
