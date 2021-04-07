import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SlideSelect from '../../../../components/SlideSelect';
import styles from './Leaderboard.module.scss';
import { formatBitcoin } from '../../../../common/util/format.util';
import BitcoinValue from '../../../../components/BitcoinValue';
import clsx from 'clsx';
import { BONUSCOUNTDOWN } from '../../../../graphql/queries';
import { useQuery } from '@apollo/client';

import useSound from 'use-sound';
import { countdown_v1 } from '../../../../components/App/App';
import { useStateValue } from '../../../../state';

interface IProps {
  loadingBet?: boolean;
  onType?: (t: TimeAggregation) => void;
  bonus?: any;
  position?: any;
}

const Leaderboard: React.FC<IProps> = ({ onType = () => null, bonus, position }) => {
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { data, refetch } = useQuery(BONUSCOUNTDOWN);
  const { t } = useTranslation(['bonuses']);
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [countDown, setCountDown] = useState<any>();
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timer, setTimer] = useState<any>();

  const [playCountDown] = useSound(countdown_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    if (data) {
      clearInterval(timer);
      const temp = data.bonusCountdown[selectedTime];
      if (temp < elapsedTime) {
        (async () => {
          await refetch();
          setElapsedTime(0);
        })();
      } else {
        setCountDown(temp - elapsedTime);
        getCountData(temp - elapsedTime);
      }
    }
  }, [data, selectedTime]);

  useEffect(() => {
    clearInterval(timer);
    if (countDown !== 0) {
      const t_temp = setInterval(() => {
        setElapsedTime(elapsedTime + 1);
        setCountDown(countDown - 1);
        getCountData(countDown - 1);
      }, 1000);
      setTimer(t_temp);
    } else {
      if (isSound) {
        (async () => {
          await playCountDown();
        })();
      }
      setTimeout(() => {
        (async () => {
          await refetch();
        })();
        setElapsedTime(0);
      }, 10000);
    }
  }, [countDown]);

  const getCountData = (t: number) => {
    setDays(Math.floor(t / (24 * 3600)));
    setHours(Math.floor((t % (24 * 3600)) / 3600));
    setMinutes(Math.ceil((t % 3600) / 60));
  };

  const onClickType = (t: TimeAggregation) => {
    setSelectedTime(t);
    onType(t);
  };

  return (
    <div>
      <div className={styles.leaderboard__title}>{t('leaderboard.title')}</div>
      {countDown && countDown !== 0 ? (
        <div className={styles.leaderboard__contents}>
          <div className={styles.p_15}>
            <SlideSelect
              selectItems={[
                {
                  label: t('leaderboard.times.daily'),
                  onClick: () => onClickType('daily'),
                },
                {
                  label: t('leaderboard.times.weekly'),
                  onClick: () => onClickType('weekly'),
                },
                {
                  label: t('leaderboard.times.monthly'),
                  onClick: () => onClickType('monthly'),
                },
              ]}
            />
          </div>
          <div className={styles.position_bonus}>
            <div className={styles.container}>
              <div className={styles.txt_color}>{t('leaderboard.your_current_position')}</div>
              <div>
                <div
                  className={clsx(
                    position ? styles.bg_green : clsx(styles.bg_green_position, styles.minus_font)
                  )}
                >
                  {position ? position : '-'}
                </div>
              </div>
              <div className={styles.txt_color}>{t('leaderboard.your_potential_bonus')}</div>
              <div className={clsx(bonus ? null : clsx(styles.bg_dash, styles.minus_font))}>
                {bonus ? <BitcoinValue value={formatBitcoin(bonus.bonus)} /> : '-'}
              </div>
            </div>
          </div>
          <div className={clsx(styles.time_bonus, styles.txt_color)}>
            <div>{t('leaderboard.time_to_bonus')}</div>
            <div className={styles.time_block}>
              <div className={styles.grid_time}>
                <div>{days && days}</div>
                <div className={styles.txt_black}>:</div>
                <div>{hours && hours}</div>
                <div className={styles.txt_black}>:</div>
                <div>{minutes && minutes}</div>
              </div>
              <div className={styles.grid_time}>
                <div className={styles.txt_small}>{t('leaderboard.times.days')}</div>
                <div />
                <div className={styles.txt_small}>{t('leaderboard.times.hours')}</div>
                <div />
                <div className={styles.txt_small}>{t('leaderboard.times.minutes')}</div>
              </div>
            </div>
            <div className={clsx(styles.reset_every, styles.txt_small)}>
              {t('leaderboard.reset_every')}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.waiting_processing}>{t('leaderboard.waiting_processing')}</div>
      )}
    </div>
  );
};

export default Leaderboard;

type TimeAggregation = 'daily' | 'weekly' | 'monthly';
