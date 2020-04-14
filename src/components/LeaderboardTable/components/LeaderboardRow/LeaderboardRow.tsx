import React from 'react';
import styles from './LeaderboardRow.module.scss';
import Bitcoin from '../../../icons/social/Bitcoin';
import { Leader } from '../../../../models/leader.model';
import { useStateValue } from '../../../../state';

interface IProps {
  leader: Leader;
  place: number;
  highlight: boolean;
}

const LeaderboardRow: React.FC<IProps> = ({ leader, place, highlight }) => {
  const [, dispatch] = useStateValue();

  return (
    <tr className={`${highlight ? styles.highlight : ''}`}>
      <td>
        <div>{place}</div>
      </td>

      <td>
        <div>
          <span
            className={styles.link}
            onClick={() =>
              dispatch({
                type: 'SHOW_MODAL',
                payload: { type: 'USER_INFO_MODAL', data: { userId: leader.userid } },
              })
            }
          >
            {leader.username}
          </span>
        </div>
      </td>

      <td className={'bold'}>
        <div>
          <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
          {leader.wager}
        </div>
      </td>

      <td className={`bold ${styles.bonus}`}>
        <div>
          <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
          {leader.bonus}
        </div>
      </td>
    </tr>
  );
};

export default LeaderboardRow;
