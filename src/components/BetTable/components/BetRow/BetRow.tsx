import React from 'react';
import { timeFromEpoch } from '../../../../common/util/date.util';
import { formatProfit } from '../../../../common/util/format.util';
import { isPositive } from '../../../../common/util/sign.util';
import Bet, { GameTypes } from '../../../../models/bet';
import Dice from '../../../icons/games/Dice';
import Clams from '../../../icons/games/Clams';
import Goals from '../../../icons/games/Goals';
import Mines from '../../../icons/games/Mines';

import styles from './BetRow.module.scss';
import BitcoinValue from '../../../BitcoinValue';

interface IProps {
  bet: Bet;
  highlight?: boolean;
}

const BetRow: React.FC<IProps> = ({ bet, highlight = false }) => {
  let gameIcon;

  switch (bet.gameid) {
    case GameTypes.CLAMS:
      gameIcon = <Clams className={styles.icon} innerClassName={styles.icon__inner} />;
      break;
    case GameTypes.DICE:
      gameIcon = <Dice className={styles.icon} innerClassName={styles.icon__inner} />;
      break;
    case GameTypes.GOALS:
      gameIcon = <Goals className={styles.icon} innerClassName={styles.icon__inner} />;
      break;
    case GameTypes.MINES:
      gameIcon = <Mines className={styles.icon} innerClassName={styles.icon__inner} />;
      break;
  }

  return (
    <tr key={bet.id} className={`${highlight ? styles['row--highlight'] : ''}`}>
      <td>
        <div>{gameIcon}</div>
      </td>
      <td>
        <div>{timeFromEpoch(bet.time)}</div>
      </td>

      <td>
        <div className={styles.username}>{bet.username}</div>
      </td>

      {/* <td className="bet-row__bold hide--small hide--medium">
        <div>
          <Bitcoin className="bet-row__icon" innerClassName="bet-row__icon__inner" />
          {formatBet(bet.bet)}
        </div>
      </td> */}

      <td
        className={`${
          isPositive(formatProfit(bet.profit)) ? styles['row--green'] : styles['row--red']
        }`}
      >
        <BitcoinValue className="text--bold" value={formatProfit(bet.profit)} />
      </td>
    </tr>
  );
};

export default BetRow;
