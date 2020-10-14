import React, { Fragment } from 'react';
import DetailList from '../../../DetailList';
import Bet from '../../../../models/bet.model';
import styles from './BetDetailsPage.module.scss';
import Username from '../../../Username';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin, formatMultiplier } from '../../../../common/util/format.util';
import GameIconAndText from '../../../GameIconAndText';
import BitcoinProfit from '../../../BitcoinProfit';
import { useTranslation } from 'react-i18next';
import DetailsContainer from '../../../DetailsContainer';
import { datetimeFromEpoch } from '../../../../common/util/date.util';
import { USER_INFO_AVATAR_URL } from '../../../../graphql/queries';
import { ApolloError, useQuery } from '@apollo/client';
import { useLocation, useNavigate } from '@reach/router';

interface IProps {
  bet: Bet;
  loading: boolean;
  avatarUrl?: string;
  error?: ApolloError;
}

const BetDetailsPage: React.FC<IProps> = ({ bet, avatarUrl, loading }) => {
  const { t } = useTranslation(['modals']);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!bet) {
    return null;
  }

  const handleUsernameClick = () => {
    navigate(`${pathname}?dialog=user-info`, {
      state: { userId: bet.userid, backPath: `${pathname}?dialog=bet-details`, backState: { bet } },
    });
  };

  return (
    <Fragment>
      <Username
        className={`${styles.username} ${styles['username--mobile']}`}
        username={bet.username}
        avatarUrl={avatarUrl}
        onClick={handleUsernameClick}
        loading={loading}
      />

      <DetailsContainer className={styles.details}>
        <Username
          className={`${styles.username} ${styles['username--desktop']}`}
          username={bet.username}
          avatarUrl={avatarUrl}
          onClick={handleUsernameClick}
          loading={loading}
        />

        <DetailList
          details={[
            { label: t('betDetails.date'), value: datetimeFromEpoch(bet.time) },
            { label: t('betDetails.betId'), value: bet.id },
            { label: t('betDetails.game'), value: <GameIconAndText game={bet.gameid} /> },
            {
              label: t('betDetails.bet'),
              value: <BitcoinValue value={formatBitcoin(bet.bet)} className={styles.value} />,
            },
            {
              label: (
                <span>
                  {t('betDetails.profit')} (
                  <span className={styles['profit-label']}>{formatMultiplier(bet.multiplier)}</span>
                  )
                </span>
              ),
              value: <BitcoinProfit value={bet.profit} className={styles.value} />,
            },
          ]}
        />
      </DetailsContainer>
    </Fragment>
  );
};

export default BetDetailsPage;

interface IWithDataProps {
  bet: Bet;
}

export const BetDetailsPageWithData: React.FC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery(USER_INFO_AVATAR_URL, {
    variables: { userId: props.bet?.userid },
  });

  return (
    <BetDetailsPage
      {...props}
      avatarUrl={data?.userInfo?.avatarUrl}
      loading={loading}
      error={error}
    />
  );
};
