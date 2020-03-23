import React from 'react';
import styles from './ClamGameButton.module.scss';
import clamCharacter from '../../../../assets/images/gameButtons/clams-character-home-button.svg';
import clamPearl from '../../../../assets/images/gameButtons/clam-pearl.svg';

import { useTranslation } from 'react-i18next';
import GameButton from '../GameButton';

interface IProps {
  onClick?: () => void;
}

const ClamGameButton: React.SFC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <GameButton headline={t(`games.clam`)} onClick={onClick} className={styles.container}>
      <div className={styles.highlight}>
        <img src={clamPearl} alt="Pearl" className={styles.highlight__animated} />
      </div>
      <img src={clamCharacter} className={styles.character} alt="Clam" />
    </GameButton>
  );
};

export default ClamGameButton;
