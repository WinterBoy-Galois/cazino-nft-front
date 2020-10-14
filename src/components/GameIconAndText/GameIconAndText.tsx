import React, { Fragment } from 'react';
import styles from './GameIconAndText.module.scss';
import GameIcon from '../GameIcon';
import { GameTypes } from '../../models/gameTypes.model';

interface IProps {
  game: GameTypes;
}

const GameIconAndText: React.FC<IProps> = ({ game }) => {
  return (
    <Fragment>
      <GameIcon game={game} className={styles['icon']} />
      {game}
    </Fragment>
  );
};

export default GameIconAndText;
