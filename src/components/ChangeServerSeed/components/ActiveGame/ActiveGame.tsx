import React, { useMemo } from 'react';
import { GameTypes } from '../../../../models/gameTypes.model';
import GameIcon from '../../../GameIcon';
import styles from './ActiveGame.module.scss';
import { Link } from '@reach/router';

interface IProps {
  game: GameTypes;
}

const linkMap: { [k in GameTypes]: string } = {
  DICE: 'dice',
  GOALS: 'goal',
  CLAMS: 'clam',
  MINES: 'mines',
};

const ActiveGame: React.FC<IProps> = ({ game }) => {
  const gameLink = useMemo(() => `/games/${linkMap[game]}`, [game]);
  return (
    <Link to={gameLink} className={styles.container}>
      <GameIcon game={game} className={styles.icon} />
      <span className={styles.title}>{game}</span>
    </Link>
  );
};

export default ActiveGame;
