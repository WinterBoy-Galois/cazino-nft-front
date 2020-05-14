import React from 'react';
import Bet from '../../models/bet';
import BetRow from './components/BetRow';
import Loading from '../Loading';
import Error from '../Error';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DispatchSpeed } from './lib/useBetBuffer.hook';

import styles from './BetTable.module.scss';
import SpacerRow from './components/SpacerRow';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: boolean;
  animationSpeed?: DispatchSpeed;
  signInUserId?: string;
}

const BetTable: React.FC<IProps> = ({
  bets = [],
  isLoading = false,
  error = false,
  animationSpeed = DispatchSpeed.NORMAL,
  signInUserId,
}) => {
  let speed = 1000;

  if (animationSpeed === DispatchSpeed.FAST) {
    speed = 500;
  }

  if (animationSpeed === DispatchSpeed.VERY_FAST) {
    speed = 250;
  }

  return (
    <div className={styles['bet-table__wrapper']}>
      <table className={styles['bet-table']}>
        <thead className={styles['bet-table__header']}>
          <tr>
            <th />
            <th>Time</th>
            <th>User</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody className={styles['bet-table__body']}>
          {bets && bets.length > 0 ? (
            <>
              <SpacerRow />
              <TransitionGroup component={null}>
                {bets.map(b => (
                  <CSSTransition
                    key={b.id}
                    classNames={{
                      enter: styles[`fade${speed}-enter`],
                      enterActive: styles[`fade${speed}-enter-active`],
                      exit: styles[`fade${speed}-exit`],
                      exitActive: styles[`fade${speed}-exit-active`],
                    }}
                    timeout={speed / 2}
                    mountOnEnter={true}
                  >
                    <BetRow
                      bet={b}
                      highlight={signInUserId ? b.userid.toString() === signInUserId : false}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
              <SpacerRow />
            </>
          ) : null}
        </tbody>
      </table>
      {!error && isLoading && (bets.length <= 0 || !bets) && <Loading />}
      {error && !isLoading && (bets.length <= 0 || !bets) && <Error>Unexpected error</Error>}
      {!error && !isLoading && (bets.length <= 0 || !bets) && <Error>No Data</Error>}
    </div>
  );
};

export default BetTable;
