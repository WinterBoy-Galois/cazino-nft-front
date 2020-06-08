import React from 'react';
import BetResultDetails from '../BetResultDetails';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';
import BetResultsDice from './components/BetResultsDice';
import styles from './BetResultsPage.module.scss';

const BetResultsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bet__results}>
        <BetResultsDice />
      </div>
      <div className={styles.bet__details}>
        <BetResultDetails
          details={[
            { label: 'bet', value: <BitcoinValue value={formatBitcoin(0.00001219)} /> },
            { label: 'roll over', value: 25.6 },
            { label: 'win chance', value: '74.4%' },
            {
              label: <ProfitLabel label="Profit" multiplier={0.12} />,
              value: <BitcoinProfit value={0.0004354} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BetResultsPage;
