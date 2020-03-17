import React, { useEffect } from 'react';
import './BetTable.scss';
import { useQuery } from '@apollo/react-hooks';
import Bet from '../../models/bet';
import { BET_ADDED, BETS } from '../../graphql/queries';
import BetRow from './components/BetRow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SpacerRow from './components/SpacerRow';

const BetTable: React.SFC = () => {
  const { subscribeToMore, loading, error, data } = useQuery<{ bets: Bet[] }>(BETS);

  useEffect(() => {
    return subscribeToMore({
      document: BET_ADDED,
      updateQuery: (prev: any, { subscriptionData }: any) =>
        subscriptionData.data
          ? { ...prev, bets: [(subscriptionData.data as any).betAdded, ...prev.bets.slice(0, 9)] }
          : prev,
    });
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  return (
    <div className="bet-table__wrapper">
      <table className="bet-table">
        <thead className="bet-table__header">
          <tr>
            <th>Time</th>
            <th className="hide--small hide--medium">Bet</th>
            <th className="hide--small hide--medium">Multiplier</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody className="bet-table__body">
          <SpacerRow />

          <TransitionGroup component={null}>
            {data?.bets.map(b => (
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
    </div>
  );
};

export default BetTable;
