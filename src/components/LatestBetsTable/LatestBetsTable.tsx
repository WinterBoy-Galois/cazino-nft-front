import React from 'react';
import Bet from '../../models/bet.model';
import BetRow from './components/BetRow';
import Loading from '../Loading';
import Error from '../Error';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DispatchSpeed } from '../../hooks/useBetBuffer.hook';

import styles from './LatestBetsTable.module.scss';
import SpacerRow from './components/SpacerRow';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from '@reach/router';

export enum ViewMode {
  RESPONSIVE,
  COMPACT,
}

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: boolean;
  animationSpeed?: DispatchSpeed;
  signInUserId?: string;
  viewMode?: ViewMode;
  reduceMotion?: boolean;
  onRowClicked?: () => void;
  onUsernameClicked?: (userId: string) => void;
}

const LatestBetsTable: React.FC<IProps> = ({
  bets = [],
  isLoading = false,
  error = false,
  animationSpeed = DispatchSpeed.NORMAL,
  signInUserId,
  viewMode = ViewMode.RESPONSIVE,
  reduceMotion = false,
  onUsernameClicked,
}) => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation(['sidebar', 'common']);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const renderBetColumn = () => {
    switch (true) {
      case breakpoint === 'xs':
        return false;
      case breakpoint === 'sm':
        return true;
      case breakpoint === 'md':
        return false;
      // case viewMode === ViewMode.COMPACT:
      default:
        return true;
    }
  };

  let speed = 1000;

  if (animationSpeed === DispatchSpeed.FAST) {
    speed = 500;
  }

  if (animationSpeed === DispatchSpeed.VERY_FAST) {
    speed = 250;
  }

  const handleRowClick = (bet: Bet) => {
    navigate(`${pathname}?dialog=bet-details`, { state: { bet } });
  };

  return (
    <div className={styles['bet-table__wrapper']}>
      <table className={styles['bet-table']}>
        <thead className={styles['bet-table__header']}>
          <tr>
            <th />
            <th>{t('latestBets.table.user')}</th>
            {renderBetColumn() && <th>{t('latestBets.table.bet')}</th>}
            <th>{t('latestBets.table.profit')}</th>
          </tr>
        </thead>
        <tbody className={styles['bet-table__body']}>
          {bets && bets.length > 0 ? (
            <>
              <SpacerRow />
              {reduceMotion ? (
                bets.map((b, i) => (
                  <BetRow
                    key={`${b.id}_${i}`}
                    bet={b}
                    highlight={signInUserId ? b.userid.toString() === signInUserId : false}
                    viewMode={viewMode}
                    onRowClicked={() => handleRowClick(b)}
                    onUsernameClicked={onUsernameClicked}
                  />
                ))
              ) : (
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
                        viewMode={viewMode}
                        onRowClicked={() => handleRowClick(b)}
                        onUsernameClicked={onUsernameClicked}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              )}
              <SpacerRow />
            </>
          ) : null}
        </tbody>
      </table>
      {!error && isLoading && (bets.length <= 0 || !bets) && <Loading />}
      {error && !isLoading && (bets.length <= 0 || !bets) && (
        <Error>{t('common:errors.UNEXPECTED')}</Error>
      )}
      {!error && !isLoading && (bets.length <= 0 || !bets) && (
        <Error>{t('common:errors.NO_DATA')}</Error>
      )}
    </div>
  );
};

export default LatestBetsTable;
