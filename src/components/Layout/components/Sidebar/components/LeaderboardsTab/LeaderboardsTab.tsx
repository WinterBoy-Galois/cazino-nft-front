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
      <div className="mb-4 mb-md-6">
        <SlideSelect
          selectItems={[
            { label: 'Daily', onClick: () => setSelectedTime('daily') },
            { label: 'Weekly', onClick: () => setSelectedTime('weekly') },
            { label: 'Monthly', onClick: () => setSelectedTime('monthly') },
          ]}
        />
      </div>
      <LeaderboardTable
        leaderboard={data ? data.leaderboardChanged[selectedTime] : []}
        isLoading={loading}
        error={error ? true : false}
      />
    </>
  );
};

export default LeaderboardsTab;

type TimeAggregation = 'daily' | 'weekly' | 'monthly';
