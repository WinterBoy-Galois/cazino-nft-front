import React, { useState } from 'react';
import styles from './ClamGameBoard.module.scss';
import clsx from 'clsx';
import ClamNoSelect from '../../components/icons/games/ClamNoSelect';
import ClamSelected from '../../components/icons/games/ClamSelected';

interface IProps {
  className?: string;
}

interface ClamProps {
  onClickHandler?: (selected: boolean) => void;
}

const Clam: React.FC<ClamProps> = ({ onClickHandler }) => {
  const [selected, setSelected] = useState(false);

  const onClamClick = () => {
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

  console.log(selectedClams);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.clam__grid}>
        {Array.from(Array(9).keys()).map(cIdx => (
          <Clam
            key={`clam-${cIdx}`}
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
