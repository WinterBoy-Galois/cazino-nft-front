import React from 'react';
import styles from './ClamGameBoard.module.scss';
import clsx from 'clsx';
import ClamNoSelect from '../../components/icons/games/ClamNoSelect';

interface IProps {
  className?: string;
  disabled?: boolean;
}

const ClamGameBoard: React.FC<IProps> = ({ className, disabled = false }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.clam__grid}>
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
        <ClamNoSelect className={styles.clam} />
      </div>
    </div>
  );
};

export default ClamGameBoard;
