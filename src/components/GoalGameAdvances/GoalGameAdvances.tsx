import React from 'react';
import styles from './GoalGameAdvances.module.scss';
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

const GoalGameAdvances: React.FC<IProps> = ({
  className,
  profits = [],
  currentStep = 0,
  selections = [],
  isEnded,
}) => {
  const getStatusClsx = (selection: any, index: number) => {
    if (isEnded && selection) {
      return clsx(
        styles.single_advance__status__spot,
        selection?.selected === index ? styles.single_advance__status__spot__selected : null,
        selection?.luckySpots?.includes(index)
          ? styles.single_advance__status__spot__lucky
          : styles.single_advance__status__spot__unlucky
      );
    }

    if (selection?.selected === index)
      return clsx(
        styles.single_advance__status__spot,
        styles.single_advance__status__spot__selected,
        styles.single_advance__status__spot__lucky
      );

    return clsx(styles.single_advance__status__spot);
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
                ? styles.single_advance__status__won
                : styles.single_advance__status__lost;
          } else if (!isEnded) {
            singleStatusClassName =
              selection.step === item.step
                ? styles.single_advance__status__won
                : styles.single_advance__status__lost;
          }
        }

        return (
          <div
            className={clsx(
              styles.single_advance,
              currentStep === item.step && !isEnded ? styles.single_advance__current : null
            )}
            key={`advance-${step}`}
          >
            <div
              className={clsx(
                styles.single_advance__status,
                currentStep === item.step ? styles.single_advance__status__current : null,
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

            <div className={styles.single_advance__multiplier}>
              &nbsp;&times;{item.multiplier.toFixed(3)}
            </div>

            {item.profit !== null ? (
              <BitcoinValue
                className={styles.single_advance__profit}
                value={formatBitcoin(item.profit)}
              />
            ) : (
              <div className={styles.single_advance__profit}>
                <span>Unavailable</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GoalGameAdvances;
