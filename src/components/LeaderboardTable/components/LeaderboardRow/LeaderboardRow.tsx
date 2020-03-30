import React from 'react';
import styles from './LeaderboardRow.module.scss';
import Bitcoin from '../../../icons/social/Bitcoin';
import { Leader } from '../../../../models/leader.model';

interface IProps {
  leader: Leader;
  place: number;
}

const LeaderboardRow: React.FC<IProps> = ({ leader, place }) => {
  return (
    <tr>
      <td>
        <div>{place}</div>
      </td>

      <td>
        <div>{leader.username}</div>
      </td>

      <td className={'bold'}>
        <div>
          <Bitcoin
            className={styles['leaderboard-row__icon']}
            innerClassName={styles['leaderboard-row__icon__inner']}
          />
          {leader.wager}
        </div>
      </td>

      <td className={'bold'}>
        <div>
          <Bitcoin
            className={styles['leaderboard-row__icon']}
            innerClassName={styles['leaderboard-row__icon__inner']}
          />
          {leader.bonus}
        </div>
      </td>
    </tr>
  );
};

export default LeaderboardRow;
