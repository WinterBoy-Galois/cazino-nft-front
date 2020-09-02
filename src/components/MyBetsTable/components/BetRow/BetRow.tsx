import React from 'react';
import { timeFromEpoch } from '../../../../common/util/date.util';
import { formatProfit, formatBet, formatMultiplier } from '../../../../common/util/format.util';
import { isPositive } from '../../../../common/util/sign.util';
import Bet from '../../../../models/bet.model';
import Dice from '../../../icons/games/Dice';
import Clams from '../../../icons/games/Clams';
import Goals from '../../../icons/games/Goals';
import Mines from '../../../icons/games/Mines';
import styles from './BetRow.module.scss';
import BitcoinValue from '../../../BitcoinValue';
import { ViewMode } from '../../MyBetsTable';
import { GameTypes } from '../../../../models/gameTypes.model';

interface IProps {
  bet: Bet;
  highlight?: boolean;
  viewMode?: ViewMode;
  onRowClicked?: () => void;
}

const BetRow: React.FC<IProps> = ({
  bet,
  highlight = false,
  viewMode = ViewMode.RESPONSIVE,
  onRowClicked,
}) => {
  let gameIcon;

  switch (bet.gameid) {
    case GameTypes.CLAMS:
      gameIcon = <Clams className={styles.icon} />;
      break;
    case GameTypes.DICE:
      gameIcon = <Dice className={styles.icon} />;
      break;
    case GameTypes.GOALS:
      gameIcon = <Goals className={styles.icon} />;
      break;
    case GameTypes.MINES:
      gameIcon = <Mines className={styles.icon} />;
      break;
  }

  return (
    <tr
      key={bet.id}
      className={`${styles.row} ${highlight ? styles['row--highlight'] : ''}`}
      onClick={onRowClicked}
    >
      <td>
        <div>{gameIcon}</div>
      </td>

      <td>
        <BitcoinValue className="text--bold" value={formatBet(bet.bet)} />
      </td>

      <td
        className={`${
          isPositive(formatProfit(bet.profit)) ? styles['row--green'] : styles['row--red']
        }`}
      >
        <BitcoinValue className="text--bold" value={formatProfit(bet.profit)} />
      </td>

      <td>
        <div>{timeFromEpoch(bet.time)}</div>
      </td>

      {viewMode === ViewMode.RESPONSIVE && (
        <>
          <td className={`${styles.multiplier}`}>
            <div>{formatMultiplier(0)}</div>
          </td>
        </>
      )}
    </tr>
  );
};

export default BetRow;
