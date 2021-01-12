import React from 'react';
import GoalGameBoard from '../../../../components/GoalGameBoard';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import clsx from 'clsx';
import styles from './GoalGame.module.scss';

interface IProps {
  loadingBet?: boolean;
}

const GoalGame: React.FC<IProps> = ({ loadingBet }) => {
  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <GoalGameBoard />
      </div>
    </div>
  );
};

export default GoalGame;

export const GoalGameWithData: React.FC<RouteComponentProps> = () => {
  return <GoalGame />;
};
