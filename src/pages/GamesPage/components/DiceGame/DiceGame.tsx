import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styles from './DiceGame.module.scss';

interface IProps {
  className?: string;
}

const DiceGame: React.FC<IProps> = () => {
  return (
    <div className={styles.container} style={{ minHeight: '600px' }}>
      Dice Game
    </div>
  );
};

export default DiceGame;

export const DiceGameWithData: React.FC<RouteComponentProps> = () => {
  return <DiceGame />;
};
