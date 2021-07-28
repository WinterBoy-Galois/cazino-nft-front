import React from 'react';
import Bet from '../../models/bet.model';
import BetRow from './components/BetRow';
import Loading from '../Loading';
import Error from '../Error';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DispatchSpeed } from '../../hooks/useBetBuffer.hook';
import styles from './MyBetsTable.module.scss';
import SpacerRow from './components/SpacerRow';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from '@reach/router';
import Button from '../Button';

export enum ViewMode {
  RESPONSIVE,
  COMPACT,
}

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: boolean;
  animationSpeed?: DispatchSpeed;
  viewMode?: ViewMode;
  reduceMotion?: boolean;
  isSignedIn?: boolean;
}

const MyBetsTable: React.FC<IProps> = ({
  bets = [],
  isLoading = false,
  error = false,
  animationSpeed = DispatchSpeed.NORMAL,
  viewMode = ViewMode.RESPONSIVE,
  reduceMotion = false,
  isSignedIn = false,
}) => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation(['sidebar', 'auth', 'common']);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const renderTimeAndMultiplierColumn = () => {
    switch (true) {
      case breakpoint === 'xs':
      case breakpoint === 'sm':
      case breakpoint === 'md':
      case viewMode === ViewMode.COMPACT:
        return false;
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
            <th>{t('myBets.table.bet')}</th>
            <th>{t('myBets.table.profit')}</th>
            <th>{t('myBets.table.time')}</th>
            {renderTimeAndMultiplierColumn() && <th>{t('myBets.table.multiplier')}</th>}
          </tr>
        </thead>
        <tbody className={styles['bet-table__body']}>
          {bets && bets.length > 0 && isSignedIn ? (
            <>
              <SpacerRow />
              {reduceMotion ? (
                bets.map(b => <BetRow key={b.id} bet={b} />)
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
                      <BetRow bet={b} viewMode={viewMode} onRowClicked={() => handleRowClick(b)} />
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
      {error && !isLoading && (bets.length <= 0 || !bets) && isSignedIn && (
        <Error>{t('common:errors.UNEXPECTED')}</Error>
      )}
      {!isLoading && !isSignedIn && (
        <Error>
          <Button onClick={() => navigate(`${pathname}?dialog=sign-in`)} className={styles.button}>
            {t('auth:signIn.headline')}
          </Button>
        </Error>
      )}
      {isSignedIn && !error && !isLoading && (bets.length <= 0 || !bets) && (
        <Error>{t('common:errors.NO_DATA')}</Error>
      )}
    </div>
  );
};

export default MyBetsTable;
