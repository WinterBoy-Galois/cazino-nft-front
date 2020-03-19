import React from 'react';
import styles from './GameButton.module.scss';
import goalCharacter from '../../../../assets/images/gameButtons/goal-character-home-button.svg';
import goalField from '../../../../assets/images/gameButtons/goal-field-home-button.svg';
import goalBall from '../../../../assets/images/gameButtons/goal-ball.svg';
import minesCharacter from '../../../../assets/images/gameButtons/mines-character-home-button.svg';
import minesShadow from '../../../../assets/images/gameButtons/mines-shadow-home-button.svg';
import minesBomb from '../../../../assets/images/gameButtons/mines-bomb.svg';
import clam from '../../../../assets/images/gameButtons/clams-character-home-button.svg';
import clamPearl from '../../../../assets/images/gameButtons/clam-pearl.svg';
import diceCharacter from '../../../../assets/images/gameButtons/dice-character-home-button.svg';
import diceShadow from '../../../../assets/images/gameButtons/dice-shadow-button.svg';
import dicesDices from '../../../../assets/images/gameButtons/dices-dices.svg';

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
      {getCharacter(game)}
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
          <img src={goalField} alt="Field" />
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
          <img src={diceShadow} alt="Field" />
        </div>
      );
    case 'MINES':
      return (
        <div className={styles.animated__mines}>
          <img src={minesBomb} alt="Bomb" />
          <img src={minesShadow} alt="Field" />
        </div>
      );
  }
};

const getCharacter = (game: GameType) => {
  switch (game) {
    case 'GOAL':
      return <img src={goalCharacter} className={styles.character} alt="Goal Keeper" />;
    case 'CLAM':
      return <img src={clam} className={styles.character} alt="Clam" />;
    case 'DICES':
      return <img src={diceCharacter} className={styles.character} alt="Dice Character" />;
    case 'MINES':
      return <img src={minesCharacter} className={styles.character} alt="Soldier" />;
  }
};
