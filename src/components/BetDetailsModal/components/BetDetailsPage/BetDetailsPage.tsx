import React from 'react';
import DetailList from '../../../DetailList';
import Bet from '../../../../models/bet.model';
import styles from './BetDetailsPage.module.scss';
import Username from '../../../Username';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';

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
          { label: 'Game', value: bet.gameid },
          { label: 'Bet', value: <BitcoinValue value={formatBitcoin(bet.bet)} /> },
          { label: `Profit (x${bet.multiplier})`, value: bet.profit },
        ]}
      />
    </div>
  );
};

export default BetDetailsPage;
