import React from 'react';
import './BetTable.scss';
import Bet from '../../models/bet';
import BetRow from './components/BetRow';
import SpacerRow from './components/SpacerRow';
import { Empty, Loading, Error } from '../LeaderboardTable';

interface IProps {
  bets: Bet[];
  isLoading: boolean;
  error: boolean;
}

const BetTable: React.FC<IProps> = ({ bets, isLoading, error }) => {
  // const { subscribeToMore, loading, error, data } = useQuery<{ bets: Bet[] }>(LATEST_BETS);

  // useEffect(() => {
  //   return subscribeToMore({
  //     document: BET_ADDED,
  //     updateQuery: (prev: any, { subscriptionData }: any) =>
  //       subscriptionData.data
  //         ? { ...prev, bets: [(subscriptionData.data as any).betAdded, ...prev.bets.slice(0, 9)] }
  //         : prev,
  //   });
  // }, [subscribeToMore]);

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bet-table__wrapper">
      <table className="bet-table">
        <thead className="bet-table__header">
          <tr>
            <th />
            <th>Time</th>
            <th>User</th>
            {/* <th className="hide--small hide--medium">Bet</th> */}
            <th>Profit</th>
          </tr>
        </thead>
        {error || isLoading ? (
          <tbody className="bet-table__body">
            <SpacerRow />
            {error && <Error />}
            {isLoading && <Loading />}
            <SpacerRow />
          </tbody>
        ) : (
          <tbody className="bet-table__body">
            <SpacerRow />
            {bets.length > 0 ? (
              bets.map((bet: Bet) => <BetRow key={bet.id} bet={bet} />)
            ) : (
              /* <TransitionGroup component={null}>
              {bets.map(b => (
                <CSSTransition
                  key={b.id}
                  classNames="fade"
                  timeout={{
                    enter: 500,
                    exit: 500,
                  }}
                  mountOnEnter={true}
                >
                  <BetRow bet={b} />
                </CSSTransition>
              ))}
            </TransitionGroup> */ <Empty />
            )}
            <SpacerRow />
          </tbody>
        )}
      </table>
    </div>
  );
};

export default BetTable;
