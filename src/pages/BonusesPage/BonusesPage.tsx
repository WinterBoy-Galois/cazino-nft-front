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
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../state';

type TimeAggregation = 'daily' | 'weekly' | 'monthly';

const BonusesPage: React.FC<RouteComponentProps> = () => {
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { loading, error, data, subscribeToMore } = useQuery(LEADERBOARDS);
  const { data: __bonusClaims, refetch: refreshBonusClaims } = useQuery(BONUSCLAIMS);
  const [bonusClaims, setBonusClaims] = useState<any>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(['bonuses']);
  const [positionBonus, setPositionBonus] = useState<any>();

  const [
    {
      auth: { user },
    },
  ] = useStateValue();

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

  useEffect(() => setBonusClaims(__bonusClaims), [__bonusClaims]);

  const onClaimBonus = () =>
    refreshBonusClaims().then(({ data: __bonusClaims }) => setBonusClaims(__bonusClaims));

  const onType = (t: TimeAggregation) => {
    setSelectedTime(t);
  };

  useEffect(() => {
    if (data && user) {
      const _temp = data.leaderboards[selectedTime];
      for (let k = 0; k < _temp.length; k++) {
        if (user.id === _temp[k].id) {
          setPositionBonus(_temp[k]);
        }
      }
    }
  }, [data]);
  return (
    <div className={styles.bonuses_page}>
      <div className={styles.bonuses_title}>{t('title')}</div>

      {bonusClaims && bonusClaims?.bonusClaims.length ? (
        <div className={styles.body_p}>
          <UnClaimedBonuses bonusClaims={bonusClaims.bonusClaims} onClaimBonus={onClaimBonus} />
          <div className={styles.leaderboard}>
            <Leaderboard onType={onType} positionBonus={positionBonus} />
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
      ) : null}
    </div>
  );
};

export default BonusesPage;
