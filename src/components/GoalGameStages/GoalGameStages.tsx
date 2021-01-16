import React from 'react';
import styles from './GoalGameStages.module.scss';
import clsx from 'clsx';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';

interface IProps {
  className?: string;
  profits?: any[];
  currentStep?: number;
}

const GoalGameStages: React.FC<IProps> = ({ className, profits = [], currentStep }) => {
  return (
    <div className={clsx(styles.container, className)}>
      {([] as any[])
        .concat(profits)
        .reverse()
        .map((item, pIdx) => (
          <div
            className={clsx(
              styles.single_stage,
              currentStep === item.step ? styles.single_stage__current : null
            )}
            key={`stage-${pIdx}`}
          >
            <div
              className={clsx(
                styles.single_stage__status,
                currentStep === item.step ? styles.single_stage__status__current : null
              )}
            ></div>

            <div className={styles.single_stage__multiplier}>
              &nbsp;&times;{item.multiplier.toFixed(3)}
            </div>

            <BitcoinValue
              className={styles.single_stage__profit}
              value={formatBitcoin(item.profit)}
            />
          </div>
        ))}
    </div>
  );
};

export default GoalGameStages;
