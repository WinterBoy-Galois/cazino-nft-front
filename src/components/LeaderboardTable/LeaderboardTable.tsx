import React from 'react';
import styles from './LeaderboardTable.module.scss';
import { Leader } from '../../models/leader.model';
import LeaderboardRow from './components/LeaderboardRow';

interface IProps {
  leaderboard: Leader[];
  isLoading: boolean;
  error: boolean;
}

const LeaderboardTable: React.FC<IProps> = ({ leaderboard, isLoading, error }) => {
  return (
    <div className={styles['leaderboard-table__wrapper']}>
      <table className={styles['leaderboard-table']}>
        <thead className={styles['leaderboard-table__header']}>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Wagered</th>
            <th className="d-none d-lg-block">bonus</th>
          </tr>
        </thead>
        {error || isLoading ? (
          <div>
            {error && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
          </div>
        ) : (
          <tbody className={styles['leaderboard-table__body']}>
            {leaderboard.length > 0
              ? leaderboard.map((l: Leader, i) => (
                  <LeaderboardRow key={i} leader={l} place={i + 1} />
                ))
              : null}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default LeaderboardTable;
