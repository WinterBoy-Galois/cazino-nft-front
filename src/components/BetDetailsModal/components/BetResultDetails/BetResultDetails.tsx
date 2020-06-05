import React from 'react';
import Bet from '../../../../models/bet.model';
import DetailsContainer from '../../../DetailsContainer';
import DetailList from '../../../DetailList';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';

interface IProps {
  bet?: Bet;
}

const BetResultDetails: React.SFC<IProps> = () => {
  return (
    <DetailsContainer>
      <DetailList
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
    </DetailsContainer>
  );
};

export default BetResultDetails;
