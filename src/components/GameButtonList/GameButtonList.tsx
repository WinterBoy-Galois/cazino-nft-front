import React from 'react';
import GameButton from './components/GameButton';
import { useNavigate } from '@reach/router';
import styles from './GameButtonList.module.scss';

const GameButtonList: React.SFC = () => {
  const navigate = useNavigate();

  const navigateToGoal = () => navigate('/games/goal');
  const navigateToMines = () => navigate('/games/mines');
  const navigateToClam = () => navigate('/games/clam');
  const navigateToDice = () => navigate('/games/dice');

  return (
    <>
      <div className="row">
        <div className={`col-12 col-md-6 ${styles['spacing--right']}`}>
          <GameButton game="GOAL" onClick={navigateToGoal} />
        </div>
        <div className={`col-12 col-md-6 ${styles['spacing--left']}`}>
          <GameButton game="MINES" onClick={navigateToMines} />
        </div>
      </div>
      <div className="row">
        <div className={`col-12 col-md-6 ${styles['spacing--right']}`}>
          <GameButton game="CLAM" onClick={navigateToClam} />
        </div>
        <div className={`col-12 col-md-6 ${styles['spacing--left']}`}>
          <GameButton game="DICES" onClick={navigateToDice} />
        </div>
      </div>
    </>
  );
};

export default GameButtonList;
