import React, { useState } from 'react';
import styles from './MineGameBoard.module.scss';
import clsx from 'clsx';

interface IProps {
  className?: string;
  value?: boolean;
}
const gemArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 5, 20, 7, 8, 8, 6, 3, 2, 2, 4, 5, 6, 7, 8];
const scoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const MineGameBoard: React.FC<IProps> = ({ className, value }) => {
  const [results, setResults] = useState(scoreArray);
  const gemSelect = (id: number) => {
    const temp = JSON.parse(JSON.stringify(results));
    if (temp[id] === 0 && value === false) {
      if (gemArray[id] % 4 === 0) {
        temp[id] = 2; // bomb;
      } else {
        temp[id] = 1; // win
      }
      setResults(temp);
    }
  };

  return (
    <div className={clsx(styles.container, className, styles.bg_images)}>
      <div className={styles.grid_container}>
        <div className={styles.grid_container_grid5}>
          {results.map((item, index) => {
            return (
              <div key={index} onClick={() => gemSelect(index)}>
                {value === true ? (
                  <div className={styles.images_stop} />
                ) : (
                  <div>
                    {item === 0 && <div className={styles.images} />}
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MineGameBoard;
