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
  isEnded?: boolean;
}

const GoalGameStages: React.FC<IProps> = ({
  className,
  profits = [],
  currentStep = 0,
  selections = [],
  isEnded,
}) => {
  const getStatusClsx = (selection: any, index: number) => {
    if (isEnded && selection) {
      return clsx(
        styles.single_stage__status__spot,
        selection?.selected === index ? styles.single_stage__status__spot__selected : null,
        selection?.luckySpots?.includes(index)
          ? styles.single_stage__status__spot__lucky
          : styles.single_stage__status__spot__unlucky
      );
    }

    return clsx(
      styles.single_stage__status__spot,
      selection?.selected === index ? styles.single_stage__status__spot__selected : null,
      selection?.selected === index ? styles.single_stage__status__spot__lucky : null
    );
  };

  return (
    <div className={clsx(styles.container, className)}>
      {profits.map((item, step) => {
        const selection = selections?.filter(selection => selection.step === step)[0];

        let singleStatusClassName = null;
        if (selection) {
          if (isEnded && selection.selected !== null) {
            singleStatusClassName =
              selection.step === item.step && selection.luckySpots?.includes(selection.selected)
                ? styles.single_stage__status__won
                : styles.single_stage__status__lost;
          } else if (!isEnded) {
            singleStatusClassName =
              selection.step === item.step
                ? styles.single_stage__status__won
                : styles.single_stage__status__lost;
          }
        }

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
                singleStatusClassName
              )}
            >
              {step <= currentStep
                ? Array.from(Array(3).keys()).map(index => {
                    return (
                      <span key={`status-${index}`} className={getStatusClsx(selection, index)} />
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
