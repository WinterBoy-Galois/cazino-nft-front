import React from 'react';
import GameButton from './components/GameButton';
import { useNavigate } from '@reach/router';
import { useStateValue } from '../../state';

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
        <GameButton game="GOAL" onClick={() => navigate('/games/goal')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <GameButton game="MINES" onClick={() => navigate('/games/mines')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <GameButton game="CLAM" onClick={() => navigate('/games/clam')} />
      </div>
      <div className={`col-12 ${isOpen ? 'col-md-12' : 'col-md-6'} col-xl-6 `}>
        <GameButton game="DICES" onClick={() => navigate('/games/dice')} />
      </div>
    </div>
  );
};

export default GameButtonList;
