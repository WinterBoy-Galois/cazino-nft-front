import React, { useEffect } from 'react';
import styles from './ClamGameBoard.module.scss';
import clsx from 'clsx';
import ClamIdle from '../icons/games/ClamIdle';
import ClamSelected from '../icons/games/ClamSelected';
import ClamLost from '../icons/games/ClamLost';
import ClamWin from '../icons/games/ClamWin';
import { useStateValue } from '../../state';

interface IClamProps {
  className?: string;
  selection?: number[];
  onClickHandler?: (isSelected: boolean) => void;
  isEnded?: boolean;
  isSelected?: boolean;
  winningClam?: boolean;
  onSelectSound?: () => void;
}

const Clam: React.FC<IClamProps> = ({
  className,
  selection = [],
  onClickHandler = () => null,
  isEnded = false,
  isSelected = false,
  winningClam = false,
  onSelectSound = () => null,
}) => {
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    if (isSound && selection?.length !== 0) {
      onSelectSound();
    }
  }, [selection]);

  const onClamClick = () => {
    if (!isSelected && selection.length == 8) return;

    onClickHandler(!isSelected);
  };

  if (isEnded) {
    return (
      <a
        className={clsx(styles.clam, className, isSelected ? null : styles.clam__fade)}
        onClick={() => {
          onClickHandler(true);
        }}
      >
        {winningClam ? <ClamWin /> : <ClamLost />}
      </a>
    );
  }

  return (
    <a
      className={clsx(styles.clam, isSelected ? null : styles.clam__idle, className)}
      onClick={onClamClick}
    >
      {isSelected ? <ClamSelected /> : <ClamIdle />}
    </a>
  );
};

interface IProps {
  className?: string;
  selection?: number[];
  setSelection?: (selection: number[]) => void;
  isEnded?: boolean;
  winningIndex?: number;
  onSelectSound?: () => void;
}

const ClamGameBoard: React.FC<IProps> = ({
  className,
  selection = [],
  setSelection = () => null,
  isEnded = false,
  winningIndex = -1,
  onSelectSound = () => null,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.clam__grid}>
        {Array.from(Array(9).keys()).map(cIdx => (
          <Clam
            key={`clam-${cIdx}`}
            selection={selection}
            onClickHandler={isSelected => {
              if (isEnded) setSelection([cIdx]);
              else if (isSelected) setSelection([...selection, cIdx]);
              else setSelection(selection.filter(scIdx => scIdx !== cIdx));
            }}
            isEnded={isEnded}
            isSelected={selection.includes(cIdx)}
            winningClam={winningIndex === cIdx}
            onSelectSound={onSelectSound}
          />
        ))}
      </div>
    </div>
  );
};

export default ClamGameBoard;
