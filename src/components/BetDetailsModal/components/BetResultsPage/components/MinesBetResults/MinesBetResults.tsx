import React from 'react';
import styles from './MinesBetResults.module.scss';
import Mine from '../../../../../../assets/images/games/mines/mines-boom.svg';
import Cash from '../../../../../../assets/images/games/mines/mines-bitcoin.svg';

interface IProps {
  fieldCount?: number;
  minePositions: number[];
  openedFields: number[];
}

const MinesBetResults: React.FC<IProps> = ({ fieldCount = 25, minePositions, openedFields }) => {
  return (
    <div className={styles.container}>
      {Array.from(new Array(fieldCount)).map((_, fieldIndex) => (
        <div
          key={fieldIndex}
          className={`${styles.field} ${
            openedFields.includes(fieldIndex) ? styles['field--opened'] : ''
          } ${minePositions.includes(fieldIndex) ? styles['field--loss'] : styles['field--win']}`}
        >
          <span className={styles.field__index}>{fieldIndex}</span>
          {minePositions.includes(fieldIndex) ? (
            <img src={Mine} alt="Mine" />
          ) : (
            <img src={Cash} alt="Cash" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MinesBetResults;
