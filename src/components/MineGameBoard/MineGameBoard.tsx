import React, { useEffect, useState } from 'react';
import styles from './MineGameBoard.module.scss';
import clsx from 'clsx';
import { MinesGameState as GameState } from '../../models/minesGameState.model';
import { useStateValue } from '../../state';

import useSound from 'use-sound';
import { mines_win_v1 } from '../App/App';

interface IProps {
  className?: string;
  gameState?: GameState;
  session?: any;
  handlePlaceBet?: (selection: number) => void;
  loadingBet?: boolean;
  isCashOut?: boolean;
}
const take_opacity = {
  opacity: 0.5,
};
const scoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const MineGameBoard: React.FC<IProps> = ({
  className,
  session,
  gameState,
  handlePlaceBet = () => null,
  loadingBet,
  isCashOut,
}) => {
  const [{ sidebar }] = useStateValue();
  const [results, setResults] = useState(scoreArray);
  const [bombId, setBombId] = useState<number>(0);
  const [isEndCut, setIsEndCut] = useState(false);

  const [playMinesWin] = useSound(mines_win_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    const scoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (session?.allowNext) {
      setIsEndCut(false);
      let tmp = [];
      tmp = scoreArray;
      if (session.open) {
        for (let k = 0; k < session.open.length; k++) {
          tmp.splice(session.open[k], 1, 1);
        }
      }
      if (session?.result) {
        for (let k = 0; k < session.result.length; k++) {
          tmp.splice(session.result[k], 1, 1);
        }
        if (isSound) {
          playMinesWin();
        }
      }
      setResults(tmp);
    }
    if (!session?.allowNext) {
      if (session?.profitCut === 'CUT') {
        setIsEndCut(true);
      } else {
        setIsEndCut(false);
      }
      const tmp = scoreArray;
      if (session?.result || session?.open) {
        const winArray = session?.result ? session?.result : session?.open;
        for (let k = 0; k < winArray.length; k++) {
          tmp.splice(winArray[k], 1, 1);
        }
        if (isSound && !session?.minePositions) {
          playMinesWin();
        }
      }

      if (session?.minePositions) {
        const minePositions = session?.minePositions;
        if (
          session?.lucky &&
          session?.result &&
          minePositions.length + session?.result.length === 24 &&
          !isCashOut
        ) {
          for (let k = 0; k < 25; k++) {
            if (minePositions.includes(k)) {
              tmp.splice(minePositions[k], 1, 2);
            } else {
              tmp.splice(k, 1, 1);
            }
          }
        } else {
          for (let k = 0; k < minePositions.length; k++) {
            tmp.splice(minePositions[k], 1, 2);
          }
          for (let k = 0; k < tmp.length; k++) {
            if (tmp[k] === 0) {
              tmp.splice(k, 1, 3);
            }
          }
        }
      }
      setResults(tmp);
    }
  }, [session]);

  useEffect(() => {
    const scoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (gameState === GameState.IDLE) {
      setResults(scoreArray);
    }
  }, [gameState]);

  const gemSelect = async (id: number) => {
    if (session?.allowNext && !loadingBet) {
      setBombId(id);
      if (results[id] === 0) {
        await handlePlaceBet(id);
      }
    }
  };

  return (
    <div
      className={clsx(
        styles.container,
        className,
        sidebar?.isOpen ? styles.bg_images_open : styles.bg_images_close
      )}
    >
      <div className={styles.grid_container}>
        <div className={styles.grid_container_grid5}>
          {results.map((item, index) => {
            return (
              <div key={index} onClick={() => gemSelect(index)}>
                <div>
                  {item === 0 && (
                    <div
                      className={
                        gameState === GameState.IDLE ||
                        isEndCut ||
                        loadingBet ||
                        gameState === GameState.GAME_ENDED
                          ? styles.images_stop
                          : styles.images
                      }
                    />
                  )}
                  {item === 3 && (
                    <div className={styles.win_show} style={take_opacity}>
                      <div className={styles.win_gem} />
                    </div>
                  )}
                  {item === 1 && (
                    <div className={styles.win_show}>
                      <div className={styles.win_gem} />
                    </div>
                  )}
                  {item === 2 && (
                    <div
                      className={styles.bomb_show}
                      style={{
                        opacity: index === bombId ? 1 : 0.5,
                      }}
                    >
                      <div className={styles.bomb_gem} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MineGameBoard;
