import React from 'react';
import styles from './GoalGameStages.module.scss';
import clsx from 'clsx';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';

interface IProps {
  className?: string;
  profits?: any[];
  currentStep?: number;
  selections?: any[];
}

const GoalGameStages: React.FC<IProps> = ({
  className,
  profits = [],
  currentStep = 0,
  selections = [],
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      {profits.map((item, step) => {
        const selection = selections?.filter(selection => selection.step === step)[0];

        return (
          <div
            className={clsx(
              styles.single_stage,
              currentStep === item.step ? styles.single_stage__current : null
            )}
            key={`stage-${step}`}
          >
            <div
              className={clsx(
                styles.single_stage__status,
                currentStep === item.step ? styles.single_stage__status__current : null,
                selection?.step === item.step ? styles.single_stage__status__won : null
              )}
            >
              {step < currentStep
                ? Array.from(Array(3).keys()).map(index => {
                    return (
                      <span
                        key={`status-${index}`}
                        className={clsx(
                          styles.single_stage__status__spot,
                          selection?.selected === index
                            ? styles.single_stage__status__spot__selected
                            : null,
                          selection?.luckySpots.includes(index)
                            ? styles.single_stage__status__spot__lucky
                            : styles.single_stage__status__spot__unlucky
                        )}
                      />
                    );
                  })
                : null}
            </div>

            <div className={styles.single_stage__multiplier}>
              &nbsp;&times;{item.multiplier.toFixed(3)}
            </div>

            <BitcoinValue
              className={styles.single_stage__profit}
              value={formatBitcoin(item.profit)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GoalGameStages;
