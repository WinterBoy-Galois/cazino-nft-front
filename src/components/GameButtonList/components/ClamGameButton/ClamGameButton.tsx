import React from 'react';
import styles from './ClamGameButton.module.scss';
import clamCharacter from '../../../../assets/images/gameButtons/clams-character-home-button.svg';
import clamPearl from '../../../../assets/images/gameButtons/clam-pearl.svg';

import { useTranslation } from 'react-i18next';
import GameButton from '../GameButton';
import { useStateValue } from '../../../../state';

interface IProps {
  onClick?: () => void;
}

const ClamGameButton: React.FC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  return (
    <GameButton headline={t(`games.clam`)} onClick={onClick} className={styles.container}>
      <div className={styles.highlight}>
        <img src={clamPearl} alt="Pearl" className={styles.highlight__animated} />
      </div>
      <img
        src={clamCharacter}
        className={`${styles.character} ${isOpen ? styles['character--with-sidebar'] : ''}`}
        alt="Clam"
      />
    </GameButton>
  );
};

export default ClamGameButton;
