import React from 'react';
import styles from './DicesGameButton.module.scss';
import dicesCharacter from '../../../../assets/images/gameButtons/dice-character-home-button.svg';
import dicesShadow from '../../../../assets/images/gameButtons/dice-shadow-button.svg';
import dices from '../../../../assets/images/gameButtons/dices-dices.svg';

import { useTranslation } from 'react-i18next';
import GameButton from '../GameButton';
import { useStateValue } from '../../../../state';

interface IProps {
  onClick?: () => void;
}

const DicesGameButton: React.FC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  return (
    <GameButton headline={t(`games.dices`)} onClick={onClick} className={styles.container}>
      <div className={styles.highlight}>
        <img src={dices} alt="Bomb" className={styles.highlight__animated} />
        <img src={dicesShadow} alt="Shadow" className={styles.highlight__static} />
      </div>
      <img
        src={dicesCharacter}
        className={`${styles.character} ${isOpen ? styles['character--with-sidebar'] : ''}`}
        alt="Soldier"
      />
    </GameButton>
  );
};

export default DicesGameButton;
