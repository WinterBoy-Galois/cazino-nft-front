import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';
import SidebarToggle from '../SidebarToggle';
import { useScrollLock } from '../../../../hooks/useScrollLock.hook';
import { Breakpoint, useBreakpoint } from '../../../../hooks/useBreakpoint.hook';
import { SidebarTab } from '../../../../state/models/sidebar.model';
import TabSelect from './components/TabSelect/TabSelect';
import LeaderboardsTab from './components/LeaderboardsTab';
import { useTranslation } from 'react-i18next';
import { useScrollbarWidth } from '../../../../hooks/useScrollbarWidth.hook';
import LatestBetsTab from './components/LatestBetsTab';
import MyBetsTab from './components/MyBetsTab';
import Bet, { GameTypes } from '../../../../models/bet';
import { useBetBuffer, DispatchSpeed } from '../../../../hooks/useBetBuffer.hook';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { LATEST_BETS } from '../../../../graphql/queries';
import { BET_ADDED } from '../../../../graphql/subscriptions';
import { ApolloError } from 'apollo-client';

const mapGameType = (gameid: string): GameTypes => {
  const games: { [key: string]: GameTypes } = {
    DICE: GameTypes.DICE,
    GOALS: GameTypes.GOALS,
    MINES: GameTypes.MINES,
    CLAMS: GameTypes.CLAMS,
  };

  return games[gameid];
};

const SideBar: React.SFC = () => {
  const [
    {
      sidebar: { isOpen, selectedTab },
      modal: { type: modalType },
    },
  ] = useStateValue();
  const breakpoint = useBreakpoint();
  useScrollLock(isOpen && activateScrollLock(breakpoint), false);
  const { t } = useTranslation(['sidebar']);
  const scrollbarWidth = useScrollbarWidth();

  const [latestBets, setLatestBets] = useState<Bet[]>([]);

  const [myBets, setMyBets] = useState<Bet[]>([]);

  const handleBetAdded = (betAdded: Bet) => {
    const newBets = [betAdded, ...latestBets.slice(0, 9)];
    setLatestBets(newBets);
  };

  const handleAddedForCurrentUser = (betAdded: Bet) => {
    const newBets = [betAdded, ...myBets.slice(0, 9)];
    setMyBets(newBets);
  };

  const { addBets } = useBetBuffer({
    bufferSize: 100,
    dispatchSpeed: DispatchSpeed.AUTO,
    currentUserId: 15,
    onBetDispatched: handleBetAdded,
    onBetAddedForCurrentUser: handleAddedForCurrentUser,
  });

  useSubscription(BET_ADDED, {
    onSubscriptionData: data => {
      const betAdded: Bet = data?.subscriptionData?.data?.betAdded;
      if (betAdded) {
        addBets([{ ...betAdded, gameid: mapGameType(betAdded.gameid.toString()) }]);
      }
    },
  });

  const { loading, error } = useQuery(LATEST_BETS, {
    onCompleted: data => {
      if (data?.bets) {
        const initialBets = data.bets.map((bet: Bet) => {
          return { ...bet, gameid: mapGameType(bet.gameid.toString()) };
        });
        setLatestBets(initialBets);
      }
    },
  });

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames={{
        enter: styles['slide--enter'],
        enterActive: styles['slide--enter-active'],
        enterDone: styles['slide--enter-active'],
        exit: styles['slide--exit'],
        exitActive: styles['slide--exit-active'],
        exitDone: styles['slide--exit-active'],
      }}
      mountOnEnter={true}
    >
      <div
        className={`${styles.container} ${styles.slide}`}
        style={{ right: `${modalType !== 'NONE' ? `${scrollbarWidth}px` : ''}` }}
      >
        <div className={styles.header}>
          <SidebarToggle show={true} />
          <h1 className={styles['header__headline']}>{t('headline')}</h1>
        </div>
        <div className={styles['tab-select']}>
          <TabSelect />
        </div>
        <div className={`container ${styles['tab-container']}`}>
          {renderTab(selectedTab, latestBets, myBets, loading, error)}
        </div>
      </div>
    </CSSTransition>
  );
};

export default SideBar;

const activateScrollLock = (breakpoint: Breakpoint): boolean => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
      return true;

    default:
      return false;
  }
};

const renderTab = (
  tab: SidebarTab,
  latestBets: Bet[],
  myBets: Bet[],
  isLoading: boolean,
  error: ApolloError | undefined
) => {
  switch (tab) {
    case 'LATEST_BETS':
      return <LatestBetsTab bets={latestBets} isLoading={isLoading} error={error} />;
    case 'MY_BETS':
      return <MyBetsTab bets={myBets} isLoading={isLoading} error={error} />;
    case 'LEADERBOARDS':
      return <LeaderboardsTab />;
  }
};
