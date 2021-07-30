import { useLocation, useNavigate } from '@reach/router';
import { useEffect } from 'react';
import { GameType } from './GameModal.component';

export const useOpenGameModal = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (search.includes('game-modal')) {
      navigate(`${pathname}`);
    }
  }, []);

  return (fileName: GameType) => {
    navigate(`${pathname}?dialog=game-modal`, { state: { fileName } });
  };
};
