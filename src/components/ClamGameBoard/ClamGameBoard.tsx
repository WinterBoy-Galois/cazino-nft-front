import React, { useState } from 'react';
import styles from './ClamGameBoard.module.scss';
import clsx from 'clsx';
import ClamNoSelect from '../../components/icons/games/ClamNoSelect';
import ClamSelected from '../../components/icons/games/ClamSelected';

interface IClamProps {
  className?: string;
  selectedClamsCount?: number;
  onClickHandler?: (selected: boolean) => void;
}

const Clam: React.FC<IClamProps> = ({
  className,
  selectedClamsCount,
  onClickHandler = () => null,
}) => {
  const [selected, setSelected] = useState(false);

  const onClamClick = () => {
    if (!selected && selectedClamsCount == 8) return;

    onClickHandler(!selected);

    setSelected(!selected);
  };

  return (
    <a
      className={clsx(styles.clam, selected ? null : styles.clam__idle, className)}
      onClick={onClamClick}
    >
      {selected ? <ClamSelected /> : <ClamNoSelect />}
    </a>
  );
};

interface IProps {
  className?: string;
  selectedClams?: number[];
  setSelectedClams?: (selection: number[]) => void;
}

const ClamGameBoard: React.FC<IProps> = ({
  className,
  selectedClams = [],
  setSelectedClams = () => null,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.clam__grid}>
        {Array.from(Array(9).keys()).map(cIdx => (
          <Clam
            key={`clam-${cIdx}`}
            selectedClamsCount={selectedClams.length}
            onClickHandler={selected => {
              if (selected) setSelectedClams([...selectedClams, cIdx]);
              else setSelectedClams(selectedClams.filter(scIdx => scIdx !== cIdx));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClamGameBoard;
