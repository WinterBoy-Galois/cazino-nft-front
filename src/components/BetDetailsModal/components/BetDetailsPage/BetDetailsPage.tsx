import React, { Fragment } from 'react';
import DetailList from '../../../DetailList';
import Bet from '../../../../models/bet.model';
import styles from './BetDetailsPage.module.scss';
import Username from '../../../Username';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin, formatMultiplier } from '../../../../common/util/format.util';
import GameIconAndText from '../../../GameIconAndText';
import BitcoinProfit from '../../../BitcoinProfit';
import { useStateValue } from '../../../../state';
import { transitionTimeout } from '../../../Modal';
import { useTranslation } from 'react-i18next';

interface IProps {
  bet: Bet;
  avatarUrl?: string;
  loading: boolean;
}

const BetDetailsPage: React.SFC<IProps> = ({ bet, avatarUrl, loading }) => {
  const { t } = useTranslation(['modals']);
  const [, dispatch] = useStateValue();

  if (!bet) {
    return null;
  }

  const handleUsernameClick = () => {
    dispatch({ type: 'HIDE_MODAL' });

    setTimeout(
      () =>
        dispatch({
          type: 'SHOW_MODAL',
          payload: {
            type: 'USER_INFO_MODAL',
            data: {
              userId: bet.userid,
              onBack: () => {
                dispatch({ type: 'HIDE_MODAL' });

                setTimeout(() => {
                  dispatch({
                    type: 'SHOW_MODAL',
                    payload: { type: 'BET_DETAILS_MODAL', data: { bet } },
                  });
                }, transitionTimeout);
              },
            },
          },
        }),
      transitionTimeout
    );
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

      <div className={styles.details}>
        <Username
          className={`${styles.username} ${styles['username--desktop']}`}
          username={bet.username}
          avatarUrl={avatarUrl}
          onClick={handleUsernameClick}
          loading={loading}
        />

        <DetailList
          details={[
            { label: t('betDetails.date'), value: bet.time },
            { label: t('betDetails.betId'), value: bet.id },
            { label: t('betDetails.game'), value: <GameIconAndText game={bet.gameid} /> },
            { label: t('betDetails.bet'), value: <BitcoinValue value={formatBitcoin(bet.bet)} /> },
            {
              label: (
                <span>
                  {t('betDetails.profit')} (
                  <span className={styles['profit-label']}>{formatMultiplier(bet.multiplier)}</span>
                  )
                </span>
              ),
              value: <BitcoinProfit value={bet.profit} />,
            },
          ]}
        />
      </div>
    </Fragment>
  );
};

export default BetDetailsPage;
