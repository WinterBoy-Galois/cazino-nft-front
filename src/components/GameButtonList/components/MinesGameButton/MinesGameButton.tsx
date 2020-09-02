import React from 'react';
import styles from './MinesGameButton.module.scss';
import minesCharacter from '../../../../assets/images/gameButtons/mines-character-home-button.svg';
import minesShadow from '../../../../assets/images/gameButtons/mines-shadow-home-button.svg';
import minesBomb from '../../../../assets/images/gameButtons/mines-bomb.svg';

import { useTranslation } from 'react-i18next';
import GameButton from '../GameButton';
import { useStateValue } from '../../../../state';

interface IProps {
  onClick?: () => void;
}

const MinesGameButton: React.FC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  return (
    <GameButton headline={t(`games.mines`)} onClick={onClick} className={styles.container}>
      <div className={styles.highlight}>
        <img src={minesBomb} alt="Bomb" className={styles.highlight__animated} />
        <img src={minesShadow} alt="Shadow" className={styles.highlight__static} />
      </div>
      <img
        src={minesCharacter}
        className={`${styles.character} ${isOpen ? styles['character--with-sidebar'] : ''}`}
        alt="Soldier"
      />
    </GameButton>
  );
};

export default MinesGameButton;
