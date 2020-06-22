import React from 'react';
import styles from './ClamsBetResults.module.scss';
import clamIdle from '../../../../../../assets/images/games/clams/clam-res-idle.svg';
import clamWin from '../../../../../../assets/images/games/clams/clam-res-win.svg';
import clamLoss from '../../../../../../assets/images/games/clams/clam-res-lost.svg';

interface IProps {
  fieldCount?: number;
  selection: number[];
  result: number;
}

const ClamsBetResults: React.FC<IProps> = ({ fieldCount = 9, selection, result }) => {
  const getClam = (index: number) => {
    if (selection.includes(index)) {
      return index === result ? clamWin : clamLoss;
    }

    if (index === result) {
      return clamWin;
    }

    return clamIdle;
  };

  return (
    <div className={styles.container}>
      {Array.from(new Array(fieldCount)).map((_, fieldIndex) => (
        <div
          key={fieldIndex}
          className={`${styles.field} ${
            selection.includes(fieldIndex) ? styles.field__selected : ''
          }`}
        >
          <img src={getClam(fieldIndex)} alt="clam" />
          <div className={styles.field__index__container}>
            <div className={styles.field__index}>{fieldIndex}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClamsBetResults;
