import React, { useState } from 'react';
import styles from './LeaderboardsTab.module.scss';
import { useTranslation } from 'react-i18next';
import SlideSelect from '../../../../../SlideSelect';
import LeaderboardTable from '../../../../../LeaderboardTable';
import { useSubscription } from '@apollo/react-hooks';
import { LEADERBOARDS_SUBSCRIPTION } from '../../../../../../graphql/subscriptions';

const LeaderboardsTab: React.SFC = () => {
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { t } = useTranslation(['sidebar']);
  const { loading, error, data } = useSubscription(LEADERBOARDS_SUBSCRIPTION);

  return (
    <>
      <div className={styles['time-select']}>
        <SlideSelect
          selectItems={[
            { label: t('leaderboards.times.daily'), onClick: () => setSelectedTime('daily') },
            { label: t('leaderboards.times.weekly'), onClick: () => setSelectedTime('weekly') },
            { label: t('leaderboards.times.monthly'), onClick: () => setSelectedTime('monthly') },
          ]}
        />
      </div>
      <div className={styles.table}>
        <LeaderboardTable
          leaderboard={data ? data.leaderboardChanged[selectedTime] : []}
          isLoading={loading}
          error={error ? true : false}
          signInUserId="15"
        />
      </div>
    </>
  );
};

export default LeaderboardsTab;

type TimeAggregation = 'daily' | 'weekly' | 'monthly';
