import React, { useState } from 'react';
import styles from './ClamGameBoard.module.scss';
import clsx from 'clsx';
import ClamNoSelect from '../../components/icons/games/ClamNoSelect';
import ClamSelected from '../../components/icons/games/ClamSelected';
import ClamLost from '../../components/icons/games/ClamLost';
import ClamWon from '../../components/icons/games/ClamWon';

interface IClamProps {
  className?: string;
  selection?: number[];
  onClickHandler?: (selected: boolean) => void;
  isOpening?: boolean;
  selected?: boolean;
  winningClam?: boolean;
}

const Clam: React.FC<IClamProps> = ({
  className,
  selection = [],
  onClickHandler = () => null,
  isOpening = false,
  selected = false,
  winningClam = false,
}) => {
  const [isSelected, setSelected] = useState(selected);

  const onClamClick = () => {
    if (!isSelected && selection.length == 8) return;

    onClickHandler(!isSelected);

    setSelected(!isSelected);
  };

  if (isOpening) {
    return (
      <a className={clsx(styles.clam, className, isSelected ? null : styles.clam__fade)}>
        {winningClam ? <ClamWon /> : <ClamLost />}
      </a>
    );
  }

  return (
    <a
      className={clsx(styles.clam, isSelected ? null : styles.clam__idle, className)}
      onClick={onClamClick}
    >
      {isSelected ? <ClamSelected /> : <ClamNoSelect />}
    </a>
  );
};

interface IProps {
  className?: string;
  selection?: number[];
  setSelection?: (selection: number[]) => void;
  isOpening?: boolean;
  winningIndex?: number;
}

const ClamGameBoard: React.FC<IProps> = ({
  className,
  selection = [],
  setSelection = () => null,
  isOpening = false,
  winningIndex = -1,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.clam__grid}>
        {Array.from(Array(9).keys()).map(cIdx => (
          <Clam
            key={`clam-${cIdx}`}
            selection={selection}
            onClickHandler={selected => {
              if (selected) setSelection([...selection, cIdx]);
              else setSelection(selection.filter(scIdx => scIdx !== cIdx));
            }}
            isOpening={isOpening}
            selected={selection.includes(cIdx)}
            winningClam={winningIndex === cIdx}
          />
        ))}
      </div>
    </div>
  );
};

export default ClamGameBoard;
