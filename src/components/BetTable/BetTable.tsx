import React from 'react';
import './BetTable.scss';
import Bet from '../../models/bet';
import BetRow from './components/BetRow';
import SpacerRow from './components/SpacerRow';
import Loading from '../Loading';
import Error from '../Error';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: boolean;
}

const BetTable: React.FC<IProps> = ({ bets = [], isLoading = false, error = false }) => {
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
        <tbody className="bet-table__body">
          <SpacerRow />
          {/* {bets.length > 0 && bets.map((bet: Bet) => <BetRow key={bet.id} bet={bet} />)} */}
          <TransitionGroup component={null}>
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
          </TransitionGroup>
          <SpacerRow />
        </tbody>
      </table>
      {!error && isLoading && (bets.length <= 0 || !bets) && <Loading />}
      {error && !isLoading && (bets.length <= 0 || !bets) && <Error>Unexpected error</Error>}
      {!error && !isLoading && (bets.length <= 0 || !bets) && <Error>No Data</Error>}
    </div>
  );
};

export default BetTable;
