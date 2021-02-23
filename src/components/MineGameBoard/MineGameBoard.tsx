import React, { useEffect, useState } from 'react';
import styles from './MineGameBoard.module.scss';
import clsx from 'clsx';
import { MinesGameState as GameState } from '../../models/minesGameState.model';

interface IProps {
  className?: string;
  gameState?: GameState;
  session?: any;
  handlePlaceBet?: (selection: number) => void;
}
const take_opacity = {
  opacity: 0.1,
};
const scoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const MineGameBoard: React.FC<IProps> = ({
  className,
  session,
  gameState,
  handlePlaceBet = () => null,
}) => {
  const [results, setResults] = useState(scoreArray);
  useEffect(() => {
    const scoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (session?.allowNext) {
      let tmp = [];
      tmp = scoreArray;
      if (session.open) {
        for (let k = 0; k < session.open.length; k++) {
          tmp.splice(session.open[k], 1, 1);
        }
      }
      if (session.result) {
        for (let k = 0; k < session.result.length; k++) {
          tmp.splice(session.result[k], 1, 1);
        }
      }
      setResults(tmp);
    }
    if (!session?.allowNext && session?.minePositions) {
      const tmp = scoreArray;
      if (session.result) {
        for (let k = 0; k < session.result.length; k++) {
          tmp.splice(session.result[k], 1, 1);
        }
      }

      if (session.minePositions) {
        for (let k = 0; k < session.minePositions.length; k++) {
          tmp.splice(session.minePositions[k], 1, 2);
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
  const gemSelect = (id: number) => {
    if (session?.allowNext) {
      if (results[id] === 0) {
        handlePlaceBet(id);
      }
    }
  };

  return (
    <div className={clsx(styles.container, className, styles.bg_images)}>
      <div className={styles.grid_container}>
        <div className={styles.grid_container_grid5}>
          {results.map((item, index) => {
            return (
              <div key={index} onClick={() => gemSelect(index)}>
                <div>
                  {item === 0 && gameState !== GameState.GAME_ENDED && (
                    <div
                      className={gameState === GameState.IDLE ? styles.images_stop : styles.images}
                    />
                  )}
                  {item === 0 && gameState === GameState.GAME_ENDED && (
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
                    <div className={styles.bomb_show}>
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
