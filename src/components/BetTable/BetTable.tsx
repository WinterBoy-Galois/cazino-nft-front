import React, { useEffect } from 'react';
import './BetTable.scss';
import { useQuery } from '@apollo/react-hooks';
import Bet, { GameTypes } from '../../models/bet';
import { BET_ADDED, LATEST_BETS } from '../../graphql/queries';
import BetRow from './components/BetRow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SpacerRow from './components/SpacerRow';

const BetTable: React.SFC = () => {
  const { subscribeToMore, loading, error, data } = useQuery<{ bets: Bet[] }>(LATEST_BETS);

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

  const errorBets: Bet[] = [
    {
      id: '1',
      time: 1582093459133,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.DICE,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.CLAMS,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.GOALS,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.MINES,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093459133,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.DICE,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.CLAMS,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.GOALS,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.MINES,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093459133,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.DICE,
      bet: 48.85313,
      profit: 48.85313,
    },
    {
      id: '1',
      time: 1582093456676,
      userid: 27,
      username: 'HaykFootball',
      gameid: GameTypes.CLAMS,
      bet: 48.85313,
      profit: 48.85313,
    },
  ];

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
        {error ? (
          // <p>Error </p>
          <tbody className="bet-table__body">
            <SpacerRow />
            {errorBets.map((bet: Bet) => (
              <BetRow key={bet.id} bet={bet} />
            ))}
            <SpacerRow />
          </tbody>
        ) : (
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
        )}
      </table>
    </div>
  );
};

export default BetTable;
