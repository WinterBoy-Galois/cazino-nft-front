import React from 'react';
import DetailList from '../../../DetailList';
import Bet from '../../../../models/bet.model';
import styles from './BetDetailsPage.module.scss';
import Username from '../../../Username';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin, formatMultiplier } from '../../../../common/util/format.util';
import GameIconAndText from '../../../GameIconAndText';
import BitcoinProfit from '../../../BitcoinProfit';

interface IProps {
  bet: Bet;
}

const BetDetailsPage: React.SFC<IProps> = ({ bet }) => {
  if (!bet) {
    return null;
  }

  return (
    <div className={styles.details}>
      <Username username={bet.username} avatarUrl={'https://dev.gambilife.com/ava/ano.svg'} />
      <DetailList
        details={[
          { label: 'Date/Time', value: bet.time },
          { label: 'Bet Id', value: bet.id },
          { label: 'Game', value: <GameIconAndText game={bet.gameid} /> },
          { label: 'Bet', value: <BitcoinValue value={formatBitcoin(bet.bet)} /> },
          {
            label: `Profit (${formatMultiplier(bet.multiplier)})`,
            value: <BitcoinProfit value={bet.profit} />,
          },
        ]}
      />
    </div>
  );
};

export default BetDetailsPage;
