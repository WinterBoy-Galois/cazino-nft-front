import React from 'react';
import GoalGameButton from './components/GoalGameButton';
import { useNavigate } from '@reach/router';
import { useStateValue } from '../../state';
import MinesGameButton from './components/MinesGameButton';
import ClamGameButton from './components/ClamGameButton';
import DicesGameButton from './components/DicesGameButton';

const GameButtonList: React.FC = () => {
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
        <ClamGameButton onClick={() => navigate('/games/clam')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <DicesGameButton onClick={() => navigate('/games/dice')} />
      </div>
    </div>
  );
};

export default GameButtonList;
