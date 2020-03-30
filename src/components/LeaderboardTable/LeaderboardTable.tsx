import React from 'react';
import './LeaderboardTable.scss';
import SpacerRow from './components/SpacerRow';
import { Leader } from '../../models/leader.model';

interface IProps {
  leaderboard: Leader[];
  isLoading: boolean;
  error: boolean;
}

const LeaderboardTable: React.FC<IProps> = ({ leaderboard, isLoading, error }) => {
  return (
    <div className="bet-table__wrapper">
      <table className="bet-table">
        <thead className="bet-table__header">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Wagered</th>
            <th>bonus</th>
          </tr>
        </thead>
        {error || isLoading ? (
          <div>
            {error && <p>Error</p>}
            {isLoading && <p>Loading...</p>}
          </div>
        ) : (
          <tbody className="bet-table__body">
            <SpacerRow />
            {leaderboard.length > 0
              ? leaderboard.map((l: Leader, i) => (
                  <tr key={i}>
                    <td>{l.username}</td>
                  </tr>
                ))
              : null}
            <SpacerRow />
          </tbody>
        )}
      </table>
    </div>
  );
};

export default LeaderboardTable;
