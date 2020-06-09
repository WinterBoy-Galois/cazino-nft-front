import React, { Fragment } from 'react';
import styles from './GameIconAndText.module.scss';
import GameIcon from '../GameIcon';
import { GameTypes } from '../../models/gameTypes.model';

interface IProps {
  game: GameTypes;
}

const GameIconAndText: React.SFC<IProps> = ({ game }) => {
  return (
    <Fragment>
      <GameIcon game={game} className={styles['icon']} innerClassName={styles['icon__inner']} />
      {game}
    </Fragment>
  );
};

export default GameIconAndText;
