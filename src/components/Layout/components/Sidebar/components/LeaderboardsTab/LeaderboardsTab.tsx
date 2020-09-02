import React, { useState, useEffect } from 'react';
import styles from './LeaderboardsTab.module.scss';
import { useTranslation } from 'react-i18next';
import SlideSelect from '../../../../../SlideSelect';
import LeaderboardTable from '../../../../../LeaderboardTable';
import { useQuery } from '@apollo/client';
import { LEADERBOARDS_SUBSCRIPTION } from '../../../../../../graphql/subscriptions';
import { LEADERBOARDS } from '../../../../../../graphql/queries';
import { useLocation, useNavigate } from '@reach/router';

const LeaderboardsTab: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { t } = useTranslation(['sidebar']);
  const { loading, error, data, subscribeToMore } = useQuery(LEADERBOARDS);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    return subscribeToMore({
      document: LEADERBOARDS_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) =>
        subscriptionData.data
          ? { ...prev, leaderboards: { ...(subscriptionData.data as any).leaderboardChanged } }
          : prev,
    });
  }, [subscribeToMore]);

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
          leaderboard={data ? data.leaderboards[selectedTime] : []}
          isLoading={loading}
          error={error ? true : false}
          signInUserId="15"
          onUsernameClicked={userId =>
            navigate(`${pathname}?dialog=user-info`, { state: { userId } })
          }
        />
      </div>
    </>
  );
};

export default LeaderboardsTab;

type TimeAggregation = 'daily' | 'weekly' | 'monthly';
