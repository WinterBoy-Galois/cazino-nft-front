import React, { useCallback } from 'react';
import styles from './Book.module.scss';
import { useLocation } from '@reach/router';
import { useOpenGameModal } from '../../../pages/GamesPage/components/GameModal/useOpenGameModal';
import { GameType } from '../../../pages/GamesPage/components/GameModal/GameModal.component';

interface IProps {
  className?: string;
}

const allowedGames: GameType[] = ['goalGame', 'diceGame', 'clamGame', 'minesGame'];

const VerifyLast: React.FC<IProps> = ({ className }) => {
  const openModal = useOpenGameModal();
  const { pathname } = useLocation();
  const onClick = useCallback(() => {
    if (pathname.includes('games')) {
      const pieces = pathname.split('/');
      const lastPiece = (pieces[pieces.length - 1] + 'Game') as GameType;
      if (allowedGames.includes(lastPiece)) {
        openModal(lastPiece);
      }
    }
  }, [pathname, openModal]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 29.11"
      className={className}
      onClick={onClick}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Слой_5" data-name="Слой 5">
          <path
            className={styles['cls-1']}
            d="M15.86,8.23A20.69,20.69,0,0,0,6.52,5a.62.62,0,0,0-.64.58.61.61,0,0,0,.58.64,19.81,19.81,0,0,1,8.73,3,.61.61,0,0,0,.34.1A.6.6,0,0,0,16,9.08.62.62,0,0,0,15.86,8.23Z"
          />
          <path
            className={styles['cls-1']}
            d="M15.86,12.29A20.69,20.69,0,0,0,6.52,9.08a.62.62,0,0,0-.64.58.61.61,0,0,0,.58.64,19.81,19.81,0,0,1,8.73,3,.61.61,0,0,0,.34.1.6.6,0,0,0,.51-.27A.62.62,0,0,0,15.86,12.29Z"
          />
          <path
            className={styles['cls-1']}
            d="M15.86,16.35a20.69,20.69,0,0,0-9.34-3.21.62.62,0,0,0-.64.58.61.61,0,0,0,.58.64,19.81,19.81,0,0,1,8.73,3,.61.61,0,0,0,.34.1A.6.6,0,0,0,16,17.2.62.62,0,0,0,15.86,16.35Z"
          />
          <path
            className={styles['cls-1']}
            d="M15.86,20.41A20.69,20.69,0,0,0,6.52,17.2a.62.62,0,0,0-.64.58.61.61,0,0,0,.58.64,19.81,19.81,0,0,1,8.73,3,.61.61,0,0,0,.34.1.6.6,0,0,0,.51-.27A.62.62,0,0,0,15.86,20.41Z"
          />
          <path
            className={styles['cls-1']}
            d="M35,28.05,34.38,5l-2-.13L33,27.52a36.72,36.72,0,0,0-13.14-.84,17.7,17.7,0,0,1,11.46-3.05,1,1,0,0,0,.78-.28,1.08,1.08,0,0,0,.31-.76L31.7,1a1,1,0,0,0-.91-1A19.45,19.45,0,0,0,17.5,4.51,19.45,19.45,0,0,0,4.21,0,1,1,0,0,0,3.3,1L2.63,22.59a1.08,1.08,0,0,0,.31.76,1,1,0,0,0,.77.28,17.81,17.81,0,0,1,11.45,3.05A36.6,36.6,0,0,0,2,27.52l.62-22.7L.62,5,0,28.05l16.12.36a1.71,1.71,0,0,0,2.76,0Zm-4.7-6.49A19.46,19.46,0,0,0,18.52,25.1V6.29A18.19,18.19,0,0,1,29.7,2Zm-25.24,0H4.7L5.3,2A18.11,18.11,0,0,1,16.49,6.29V25.1A19.57,19.57,0,0,0,5.06,21.56Z"
          />
          <path
            className={styles['cls-1']}
            d="M19.47,9.35a.61.61,0,0,0,.34-.1,19.81,19.81,0,0,1,8.73-3A.61.61,0,0,0,28.48,5a20.69,20.69,0,0,0-9.34,3.21.62.62,0,0,0-.18.85A.6.6,0,0,0,19.47,9.35Z"
          />
          <path
            className={styles['cls-1']}
            d="M19.47,13.41a.61.61,0,0,0,.34-.1,19.81,19.81,0,0,1,8.73-3,.61.61,0,0,0-.06-1.22,20.69,20.69,0,0,0-9.34,3.21.62.62,0,0,0-.18.85A.6.6,0,0,0,19.47,13.41Z"
          />
          <path
            className={styles['cls-1']}
            d="M19.47,17.47a.61.61,0,0,0,.34-.1,19.81,19.81,0,0,1,8.73-3,.61.61,0,0,0-.06-1.22,20.69,20.69,0,0,0-9.34,3.21.62.62,0,0,0-.18.85A.6.6,0,0,0,19.47,17.47Z"
          />
          <path
            className={styles['cls-1']}
            d="M19.47,21.53a.61.61,0,0,0,.34-.1,19.81,19.81,0,0,1,8.73-3,.61.61,0,1,0-.06-1.22,20.69,20.69,0,0,0-9.34,3.21.62.62,0,0,0-.18.85A.6.6,0,0,0,19.47,21.53Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default VerifyLast;
