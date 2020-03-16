import React from 'react';
import styles from './GameButton.module.scss';
import goalBall from '../../../../assets/images/gameButtons/goal-ball.svg';
import clamPearl from '../../../../assets/images/gameButtons/clam-pearl.svg';
import dicesDices from '../../../../assets/images/gameButtons/dices-dices.svg';
import minesBomb from '../../../../assets/images/gameButtons/mines-bomb.svg';
import { useTranslation } from 'react-i18next';

type GameType = 'GOAL' | 'CLAM' | 'DICES' | 'MINES';

interface IProps {
  game: GameType;
  onClick?: () => void;
}

const GameButton: React.SFC<IProps> = ({ game, onClick }) => {
  const gameClass = getGameClass(game);
  const { t } = useTranslation();

  return (
    <div className={`${styles.container} ${gameClass}`} onClick={onClick}>
      <h2 className={styles.headline}>{t(`games.${game.toLowerCase()}`)}</h2>
      <span className={styles.subline}>{t('play')}</span>
      {getHighlight(game)}
    </div>
  );
};

export default GameButton;

const getGameClass = (game: GameType) => {
  switch (game) {
    case 'GOAL':
      return styles.container__goal;
    case 'CLAM':
      return styles.container__clam;
    case 'DICES':
      return styles.container__dices;
    case 'MINES':
      return styles.container__mines;
  }
};

const getHighlight = (game: GameType) => {
  switch (game) {
    case 'GOAL':
      return (
        <div className={styles.animated__ball}>
          <img src={goalBall} alt="Ball" />
        </div>
      );
    case 'CLAM':
      return (
        <div className={styles.animated__clam}>
          <img src={clamPearl} alt="Pear" />
        </div>
      );
    case 'DICES':
      return (
        <div className={styles.animated__dices}>
          <img src={dicesDices} alt="Dices" />
        </div>
      );
    case 'MINES':
      return (
        <div className={styles.animated__mines}>
          <img src={minesBomb} alt="Bomb" />
        </div>
      );
  }
};
