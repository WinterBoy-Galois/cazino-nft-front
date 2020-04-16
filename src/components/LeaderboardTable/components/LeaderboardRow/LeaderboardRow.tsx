import React from 'react';
import styles from './LeaderboardRow.module.scss';
import Bitcoin from '../../../icons/social/Bitcoin';
import { Leader } from '../../../../models/leader.model';

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

      <td className={'text--bold'}>
        <div>
          <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
          {leader.wager}
        </div>
      </td>

      <td className={`text--bold ${styles.bonus}`}>
        <div>
          <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
          {leader.bonus}
        </div>
      </td>
    </tr>
  );
};

export default LeaderboardRow;
