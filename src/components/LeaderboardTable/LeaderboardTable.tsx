import React from 'react';
import styles from './LeaderboardTable.module.scss';
import { Leader } from '../../models/leader.model';
import LeaderboardRow from './components/LeaderboardRow';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import SpacerRow from './components/SpacerRow';
import Loading from './components/Loading';
import Empty from './components/Empty';
import Error from './components/Error';

interface IProps {
  leaderboard: Leader[];
  isLoading: boolean;
  error: boolean;
  signInUserId: string;
}

const LeaderboardTable: React.FC<IProps> = ({ leaderboard, isLoading, error, signInUserId }) => {
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
        <tbody className={styles['leaderboard-table__body']}>
          {leaderboard && leaderboard.length > 0 ? (
            <>
              <SpacerRow />
              {leaderboard.map((l: Leader, i) => (
                <SwitchTransition key={i} mode="out-in">
                  <CSSTransition
                    key={`${l.userid}`}
                    classNames={{
                      enter: styles['fade-enter'],
                      enterActive: styles['fade-enter-active'],
                      exit: styles['fade-exit'],
                      exitActive: styles['fade-exit-active'],
                    }}
                    timeout={500}
                  >
                    <LeaderboardRow
                      leader={l}
                      place={i + 1}
                      highlight={l.userid === signInUserId}
                    />
                  </CSSTransition>
                </SwitchTransition>
              ))}
              <SpacerRow />
            </>
          ) : null}
        </tbody>
      </table>
      {!error && isLoading && (leaderboard.length <= 0 || !leaderboard) && <Loading />}
      {error && !isLoading && (leaderboard.length <= 0 || !leaderboard) && <Error />}
      {!error && !isLoading && (leaderboard.length <= 0 || !leaderboard) && <Empty />}
    </div>
  );
};

export default LeaderboardTable;
