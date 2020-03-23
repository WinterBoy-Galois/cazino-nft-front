import React from 'react';
import styles from './GoalGameButton.module.scss';
import goalCharacter from '../../../../assets/images/gameButtons/goal-character-home-button.svg';
import goalField from '../../../../assets/images/gameButtons/goal-field-home-button.svg';
import goalBall from '../../../../assets/images/gameButtons/goal-ball.svg';

import { useTranslation } from 'react-i18next';
import GameButton from '../GameButton';

interface IProps {
  onClick?: () => void;
}

const GoalGameButton: React.SFC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <GameButton headline={t(`games.goal`)} onClick={onClick} className={styles.container}>
      <div className={styles.highlight}>
        <img src={goalBall} alt="Ball" className={styles.highlight__animated} />
        <img src={goalField} alt="Field" className={styles.highlight__static} />
      </div>
      <img src={goalCharacter} className={styles.character} alt="Goal Keeper" />
    </GameButton>
  );
};

export default GoalGameButton;
