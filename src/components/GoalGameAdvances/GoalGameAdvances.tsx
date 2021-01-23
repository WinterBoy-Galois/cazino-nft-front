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
  hideMiddleBall?: boolean;
}

const GoalGameAdvances: React.FC<IProps> = ({
  className,
  profits = [],
  currentStep = 0,
  selections = [],
  isEnded,
  hideMiddleBall = false,
}) => {
  const getStatusClsx = (selection: any, index: number, hideMiddleStatus: boolean) => {
    if (isEnded || selection?.selected === index) {
      return clsx(
        styles.single_advance__status__spot,
        hideMiddleStatus && index == 1 ? styles.single_advance__status__spot__hidden : null,
        selection?.selected === index ? styles.single_advance__status__spot__selected : null,
        selection?.luckySpots?.includes(index)
          ? styles.single_advance__status__spot__lucky
          : styles.single_advance__status__spot__unlucky
      );
    }

    return clsx(
      styles.single_advance__status__spot,
      hideMiddleStatus && index == 1 ? styles.single_advance__status__spot__hidden : null
    );
  };

  return (
    <div className={clsx(styles.container, className)}>
      {profits.map((item, step) => {
        const selection = selections?.filter(selection => selection.step === step)[0];

        let singleStatusClassName = null;
        if (selection && selection?.selected !== null) {
          singleStatusClassName = selection.luckySpots?.includes(selection.selected)
            ? styles.single_advance__status__won
            : styles.single_advance__status__lost;
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
                ? Array.from(Array(3).keys()).map(index => (
                    <span
                      key={`status-${index}`}
                      className={getStatusClsx(selection, index, hideMiddleBall)}
                    />
                  ))
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
