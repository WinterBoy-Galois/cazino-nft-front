import React from 'react';
import './BetRow.scss';
import { timeFromEpoch } from '../../../../lib/date.extensions';
import Bitcoin from '../../../icons/social/Bitcoin';
import { formatProfit } from '../../../../lib/format.extensions';
import { isPositive } from '../../../../lib/sign.extensions';
import Bet, { GameTypes } from '../../../../models/bet';
import Dice from '../../../icons/games/Dice';
import Clams from '../../../icons/games/Clams';
import Goals from '../../../icons/games/Goals';
import Mines from '../../../icons/games/Mines';

interface IProps {
  bet: Bet;
}

const BetRow: React.FC<IProps> = ({ bet }) => {
  let gameIcon;

  switch (bet.gameid) {
    case GameTypes.CLAMS:
      gameIcon = <Clams className="bet-row__game" innerClassName="bet-row__game__inner" />;
      break;
    case GameTypes.DICE:
      gameIcon = <Dice className="bet-row__game" innerClassName="bet-row__game__inner" />;
      break;
    case GameTypes.GOALS:
      gameIcon = <Goals className="bet-row__game" innerClassName="bet-row__game__inner" />;
      break;
    case GameTypes.MINES:
      gameIcon = <Mines className="bet-row__game" innerClassName="bet-row__game__inner" />;
      break;
  }

  return (
    <tr key={bet.id}>
      <td>
        <div className="bet-row__cell">{gameIcon}</div>
      </td>
      <td>
        <div className="bet-row__cell">{timeFromEpoch(bet.time)}</div>
      </td>

      <td>
        <div className="bet-row__cell">{bet.username}</div>
      </td>

      {/* <td className="bet-row__bold hide--small hide--medium">
        <div>
          <Bitcoin className="bet-row__icon" innerClassName="bet-row__icon__inner" />
          {formatBet(bet.bet)}
        </div>
      </td> */}

      <td
        className={`bet-row__bold ${
          isPositive(formatProfit(bet.profit)) ? 'bet-row__green' : 'bet-row__red'
        }`}
      >
        <div className="bet-row__cell">
          <Bitcoin className="bet-row__icon" innerClassName="bet-row__icon__inner" />
          {formatProfit(bet.profit)}
        </div>
      </td>
    </tr>
  );
};

export default BetRow;
