import React from 'react';
import styles from './GoalGameAdvances.module.scss';
import clsx from 'clsx';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';
import { appConfig } from '../../common/config';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['components']);
  const getStatusClsx = (selection: any, index: number) => {
    if (isEnded || selection?.selected === index) {
      return clsx(
        styles.single_advance__status__spot,
        selection?.selected === index ? styles.single_advance__status__spot__selected : null,
        selection?.luckySpots?.includes(index)
          ? styles.single_advance__status__spot__lucky
          : styles.single_advance__status__spot__unlucky
      );
    }

    return clsx(styles.single_advance__status__spot);
  };

  if (profits?.length === 0) return <div />;

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.innerContainer}>
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
                {step <= (isEnded && !selection ? currentStep - 1 : currentStep)
                  ? Array.from(Array(hideMiddleBall ? 2 : 3).keys()).map(index => (
                      <span key={`status-${index}`} className={getStatusClsx(selection, index)} />
                    ))
                  : null}
              </div>

              <div className={styles.single_advance__multiplier}>
                &nbsp;&times;{item.multiplier.toFixed(appConfig.goalsMultiplierPrecision)}
              </div>

              {item.profit !== null ? (
                <BitcoinValue
                  className={styles.single_advance__profit}
                  value={formatBitcoin(item.profit)}
                />
              ) : (
                <div className={styles.single_advance__profit}>
                  <span>{t('goalGameAdvances.unavailable')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalGameAdvances;
