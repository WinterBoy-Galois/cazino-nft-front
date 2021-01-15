import React from 'react';
import styles from './GoalGameStages.module.scss';
import clsx from 'clsx';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';

interface IProps {
  className?: string;
  profits?: any[];
}

const GoalGameStages: React.FC<IProps> = ({ className, profits = [] }) => {
  return (
    <div className={clsx(styles.container, className)}>
      {profits.map((item, pIdx) => (
        <div className={styles.single_stage} key={`stage-${pIdx}`}>
          <div className={styles.single_stage__status}></div>
          <div>&nbsp;&times;{item.multiplier.toFixed(3)}</div>
          <BitcoinValue value={formatBitcoin(item.profit)} />
        </div>
      ))}
    </div>
  );
};

export default GoalGameStages;
