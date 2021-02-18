import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import UnClaimedBonuses from './components/UnClaimedBonuses/UnClaimedBonuses';
import Leaderboard from './components/Leaderboard/Leaderboard';
import LeaderboardTable from '../../components/LeaderboardTable/LeaderboardTable';
import { LEADERBOARDS, BONUSCLAIMS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { LEADERBOARDS_SUBSCRIPTION } from '../../graphql/subscriptions';
import { useLocation, useNavigate } from '@reach/router';
import styles from './BonusesPage.module.scss';

type TimeAggregation = 'daily' | 'weekly' | 'monthly';

const BonusesPage: React.FC<RouteComponentProps> = () => {
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { loading, error, data, subscribeToMore } = useQuery(LEADERBOARDS);
  const { data: bonusClaims } = useQuery(BONUSCLAIMS);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!subscribeToMore) return;

    return subscribeToMore({
      document: LEADERBOARDS_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) =>
        subscriptionData.data
          ? { ...prev, leaderboards: { ...(subscriptionData.data as any).leaderboardChanged } }
          : prev,
    });
  }, [subscribeToMore]);

  return (
    <div className={styles.bonuses_page}>
      <div className={styles.bonuses_title}>Bonuses</div>

      {bonusClaims && bonusClaims?.bonusClaims.length ? (
        <UnClaimedBonuses bonusClaims={bonusClaims.bonusClaims} />
      ) : null}

      <div className={styles.leaderboard}>
        <Leaderboard />
      </div>

      <div className={styles.leaderboard__table}>
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
    </div>
  );
};

export default BonusesPage;
