import React from 'react';
import styles from './LeaderboardRow.module.scss';
import { Leader } from '../../../../models/leader.model';
import { formatBitcoin } from '../../../../common/util/format.util';
import BitcoinValue from '../../../BitcoinValue';

interface IProps {
  leader: Leader;
  place: number;
  highlight: boolean;
  onRowClicked?: () => void;
  onUsernameClicked?: (userId: string) => void;
}

const LeaderboardRow: React.FC<IProps> = ({
  leader,
  place,
  highlight,
  onRowClicked,
  onUsernameClicked,
}) => {
  const handleClickUsername: React.MouseEventHandler = event => {
    if (onUsernameClicked) {
      onUsernameClicked(leader.userid);
    }

    event.stopPropagation();
  };

  return (
    <tr
      className={`${styles.row} ${highlight ? styles['row--highlight'] : ''}`}
      onClick={onRowClicked}
    >
      <td>
        <div>{place}</div>
      </td>

      <td>
        <div className={styles.username}>
          <span className={styles.link} onClick={handleClickUsername}>
            {leader.username}
          </span>
        </div>
      </td>

      <td>
        <BitcoinValue className="text--bold" value={formatBitcoin(leader.wager)} />
      </td>

      <td className={`${styles.bonus}`}>
        <BitcoinValue className="text--bold" value={formatBitcoin(leader.bonus)} />
      </td>
    </tr>
  );
};

export default LeaderboardRow;
