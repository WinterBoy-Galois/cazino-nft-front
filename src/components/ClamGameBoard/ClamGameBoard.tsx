import React, { useState } from 'react';
import styles from './ClamGameBoard.module.scss';
import clsx from 'clsx';
import ClamNoSelect from '../../components/icons/games/ClamNoSelect';
import ClamSelected from '../../components/icons/games/ClamSelected';

interface IProps {
  className?: string;
}

interface ClamProps {
  selectedClamsCount?: number;
  onClickHandler?: (selected: boolean) => void;
}

const Clam: React.FC<ClamProps> = ({ selectedClamsCount, onClickHandler }) => {
  const [selected, setSelected] = useState(false);

  const onClamClick = () => {
    if (!selected && selectedClamsCount == 8) return;

    if (onClickHandler) onClickHandler(!selected);

    setSelected(!selected);
  };

  return (
    <a className={clsx(styles.clam, selected ? null : styles.clam__idle)} onClick={onClamClick}>
      {selected ? <ClamSelected /> : <ClamNoSelect />}
    </a>
  );
};

const ClamGameBoard: React.FC<IProps> = ({ className }) => {
  const [selectedClams, setSelectedClams] = useState<number[]>([]);

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
