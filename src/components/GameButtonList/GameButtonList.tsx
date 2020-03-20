import React from 'react';
import GoalGameButton from './components/GoalGameButton';
import { useNavigate } from '@reach/router';
import { useStateValue } from '../../state';
import MinesGameButton from './components/MinesGameButton';

const GameButtonList: React.SFC = () => {
  const navigate = useNavigate();
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  return (
    <div className="row">
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <GoalGameButton onClick={() => navigate('/games/goal')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <MinesGameButton onClick={() => navigate('/games/mines')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <GoalGameButton onClick={() => navigate('/games/goal')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <GoalGameButton onClick={() => navigate('/games/goal')} />
      </div>
    </div>
  );
};

export default GameButtonList;
