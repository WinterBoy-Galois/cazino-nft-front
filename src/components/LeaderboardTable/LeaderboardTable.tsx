import React from 'react';
import styles from './LeaderboardTable.module.scss';
import { Leader } from '../../models/leader.model';
import LeaderboardRow from './components/LeaderboardRow';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';

interface IProps {
  leaderboard: Leader[];
  isLoading: boolean;
  error: boolean;
}

const LeaderboardTable: React.FC<IProps> = ({ leaderboard, isLoading, error }) => {
  const breakpoint = useBreakpoint();

  const renderBonusColumn = () => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return false;
      default:
        return true;
    }
  };

  return (
    <div className={styles['leaderboard-table__wrapper']}>
      <table className={styles['leaderboard-table']}>
        <thead className={styles['leaderboard-table__header']}>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Wagered</th>
            {renderBonusColumn() && <th>bonus</th>}
          </tr>
        </thead>
        {!error && !isLoading && (
          <tbody className={styles['leaderboard-table__body']}>
            {leaderboard.length > 0
              ? leaderboard.map((l: Leader, i) => (
                  <LeaderboardRow key={i} leader={l} place={i + 1} />
                ))
              : null}
          </tbody>
        )}
      </table>
      {error ||
        (isLoading && (
          <div>
            {error && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
          </div>
        ))}
    </div>
  );
};

export default LeaderboardTable;
