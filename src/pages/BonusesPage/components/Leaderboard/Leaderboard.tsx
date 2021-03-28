import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SlideSelect from '../../../../components/SlideSelect';
import styles from './Leaderboard.module.scss';
import { formatBitcoin } from '../../../../common/util/format.util';
import BitcoinValue from '../../../../components/BitcoinValue';
import clsx from 'clsx';

interface IProps {
  loadingBet?: boolean;
}

const Leaderboard: React.FC<IProps> = () => {
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { t } = useTranslation(['bonuses']);
  return (
    <div>
      <div className={styles.leaderboard__title}>{t('leaderboard.title')}</div>
      <div className={styles.leaderboard__contents}>
        <div className={styles.p_15}>
          <SlideSelect
            selectItems={[
              { label: t('leaderboard.times.daily'), onClick: () => setSelectedTime('daily') },
              { label: t('leaderboard.times.weekly'), onClick: () => setSelectedTime('weekly') },
              { label: t('leaderboard.times.monthly'), onClick: () => setSelectedTime('monthly') },
            ]}
          />
        </div>
        <div className={styles.position_bonus}>
          <div className={styles.container}>
            <div className={styles.txt_color}>{t('leaderboard.your_current_position')}</div>
            <div>
              <div className={styles.bg_green}>2</div>
            </div>
            <div className={styles.txt_color}>{t('leaderboard.your_potential_bonus')}</div>
            <div>
              <BitcoinValue value={formatBitcoin(0.04885313)} />
            </div>
          </div>
        </div>
        <div className={clsx(styles.time_bonus, styles.txt_color)}>
          <div>{t('leaderboard.time_to_bonus')}</div>
          <div className={styles.time_block}>
            <div className={styles.grid_time}>
              <div>25</div>
              <div className={styles.txt_black}>:</div>
              <div>19</div>
              <div className={styles.txt_black}>:</div>
              <div>59</div>
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
    </div>
  );
};

export default Leaderboard;

type TimeAggregation = 'daily' | 'weekly' | 'monthly';
