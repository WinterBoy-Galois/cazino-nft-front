import React from 'react';
import './BetRow.scss';
import { datetimeFromEpoch } from '../../../../lib/date.extensions';
import Bitcoin from '../../../icons/social/Bitcoin';
import { formatBet, formatMultiplier, formatProfit } from '../../../../lib/format.extensions';
import { isPositive } from '../../../../lib/sign.extensions';
import Bet from '../../../../models/bet';

interface IProps {
  bet: Bet;
}

const BetRow: React.FC<IProps> = ({ bet }) => {
  return (
    <tr key={bet.id}>
      <td>
        <div>{datetimeFromEpoch(bet.time)}</div>
      </td>

      <td className="bet-row__bold hide--small hide--medium">
        <div>
          <Bitcoin className="bet-row__icon" />
          {formatBet(bet.bet)}
        </div>
      </td>

      <td className="bet-row__bold hide--small hide--medium">
        <div>{formatMultiplier(bet.payout)}</div>
      </td>

      <td
        className={`bet-row__bold ${
          isPositive(formatProfit(bet.profit)) ? 'bet-row__green' : 'bet-row__red'
        }`}
      >
        <div>
          <Bitcoin className="bet-row__icon" />
          {formatProfit(bet.profit)}
        </div>
      </td>
    </tr>
  );
};

export default BetRow;
