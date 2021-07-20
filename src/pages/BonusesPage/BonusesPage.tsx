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
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import { useUserState } from '../../user/UserProvider';

type TimeAggregation = 'daily' | 'weekly' | 'monthly';

const BonusesPage: React.FC<RouteComponentProps> = () => {
  const isAuthorized = useIsAuthorized();
  const [selectedTime, setSelectedTime] = useState<TimeAggregation>('daily');
  const { loading, error, data, subscribeToMore } = useQuery(LEADERBOARDS);
  const { data: __bonusClaims, refetch: refreshBonusClaims } = useQuery(BONUSCLAIMS);
  const [bonusClaims, setBonusClaims] = useState<any>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(['bonuses']);
  const [bonus, setBonus] = useState<any>();
  const [position, setPosition] = useState<any>();
  const [{ user }] = useUserState();

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
    if (data) {
      const _temp = data.leaderboards[selectedTime];
      if (isAuthorized) {
        let flag_num = null;
        for (let k = 0; k < _temp.length; k++) {
          if (user?.id === _temp[k].userid) {
            setBonus(_temp[k]);
            setPosition(k + 1);
            flag_num = k;
            break;
          }
        }
        if (flag_num === null) setPosition(null);
      } else {
        setPosition(null);
      }
    }
  }, [data, selectedTime, isAuthorized]);

  return (
    <div className={styles.bonuses_page}>
      <div className={styles.bonuses_title}>{isAuthorized ? t('title') : t('promo.title')}</div>

      <div className={styles.body_p}>
        {isAuthorized ? (
          <>
            {bonusClaims && bonusClaims?.bonusClaims.length ? (
              <UnClaimedBonuses bonusClaims={bonusClaims.bonusClaims} onClaimBonus={onClaimBonus} />
            ) : null}

            <div className={styles.leaderboard}>
              <Leaderboard onType={onType} bonus={bonus} position={position} />
            </div>

            <div className={styles.leaderboard__table}>
              <LeaderboardTable
                leaderboard={data ? data.leaderboards[selectedTime] : []}
                isLoading={loading}
                error={!!error}
                signInUserId="15"
                onUsernameClicked={userId =>
                  navigate(`${pathname}?dialog=user-info`, { state: { userId } })
                }
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BonusesPage;
