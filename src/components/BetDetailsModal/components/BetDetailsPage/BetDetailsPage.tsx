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

interface IProps {
  bet: Bet;
}

const BetDetailsPage: React.SFC<IProps> = ({ bet }) => {
  const [, dispatch] = useStateValue();

  if (!bet) {
    return null;
  }

  const handleUsernameClick = () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        type: 'USER_INFO_MODAL',
        data: {
          userId: bet.userid,
          onBack: () =>
            dispatch({
              type: 'SHOW_MODAL',
              payload: { type: 'BET_DETAILS_MODAL', data: { bet } },
            }),
        },
      },
    });
  };

  return (
    <Fragment>
      <Username
        className={`${styles.username} ${styles['username--mobile']}`}
        username={bet.username}
        avatarUrl={'https://dev.gambilife.com/ava/ano.svg'}
        onClick={handleUsernameClick}
      />

      <div className={styles.details}>
        <Username
          className={`${styles.username} ${styles['username--desktop']}`}
          username={bet.username}
          avatarUrl={'https://dev.gambilife.com/ava/ano.svg'}
          onClick={handleUsernameClick}
        />

        <DetailList
          details={[
            { label: 'Date/Time', value: bet.time },
            { label: 'Bet Id', value: bet.id },
            { label: 'Game', value: <GameIconAndText game={bet.gameid} /> },
            { label: 'Bet', value: <BitcoinValue value={formatBitcoin(bet.bet)} /> },
            {
              label: (
                <span>
                  Profit (
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
