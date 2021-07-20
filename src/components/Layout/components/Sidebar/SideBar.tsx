import React, { useEffect, useState } from 'react';
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
import Bet from '../../../../models/bet.model';
import { useBetBuffer, DispatchSpeed } from '../../../../hooks/useBetBuffer.hook';
import { RECENT_BETS } from '../../../../graphql/queries';
import { BET_ADDED } from '../../../../graphql/subscriptions';
import { ApolloError, useQuery, useSubscription } from '@apollo/client';
import { GameTypes } from '../../../../models/gameTypes.model';
import chatWidget from '../../../../customerSupport/CustomerSupport';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';
import { useUserState } from '../../../../user/UserProvider';

const activateScrollLock = (breakpoint: Breakpoint): boolean => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
      return true;

    default:
      return false;
  }
};

const mapGameType = (gameid: string): GameTypes => {
  const games: { [key: string]: GameTypes } = {
    DICE: GameTypes.DICE,
    GOALS: GameTypes.GOALS,
    MINES: GameTypes.MINES,
    CLAMS: GameTypes.CLAMS,
  };

  return games[gameid];
};

const renderTab = (
  tab: SidebarTab,
  latestBets: Bet[],
  myBets: Bet[],
  isLoading: boolean,
  error: ApolloError | undefined,
  isSignedIn?: boolean
) => {
  switch (tab) {
    case 'LATEST_BETS':
      return <LatestBetsTab bets={latestBets} isLoading={isLoading} error={error} />;
    case 'MY_BETS':
      return (
        <MyBetsTab bets={myBets} isLoading={isLoading} error={error} isSignedIn={isSignedIn} />
      );
    case 'LEADERBOARDS':
      return <LeaderboardsTab />;
  }
};

const SideBar: React.FC = () => {
  const isAuthorized = useIsAuthorized();
  const [
    {
      sidebar: { isOpen, selectedTab, isChatBot },
      modal: { type: modalType },
    },
  ] = useStateValue();
  const [{ user }] = useUserState();

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
    currentUserId: user?.id ? +user?.id : 0,
    onBetDispatched: handleBetAdded,
    onBetAddedForCurrentUser: handleAddedForCurrentUser,
  });

  useSubscription(BET_ADDED, {
    onSubscriptionData: data => {
      const betAdded: Bet = data?.subscriptionData?.data?.betAdded;
      if (betAdded) {
        addBets([
          {
            ...betAdded,
            gameid: betAdded.gameid ? mapGameType(betAdded.gameid.toString()) : betAdded.gameid,
          },
        ]);
      }
    },
  });

  const { loading, error } = useQuery(RECENT_BETS, {
    onCompleted: data => {
      if (data?.recentBets?.allBets) {
        const initialLatestBets = data.recentBets.allBets.map((bet: Bet) => {
          return {
            ...bet,
            gameid: bet.gameid ? mapGameType(bet.gameid.toString()) : bet.gameid,
          };
        });
        setLatestBets(initialLatestBets);
      }

      if (data?.recentBets?.myBets) {
        const initialMyBets = data.recentBets.myBets.map((bet: Bet) => {
          return {
            ...bet,
            gameid: bet.gameid ? mapGameType(bet.gameid.toString()) : bet.gameid,
          };
        });
        setMyBets(initialMyBets);
      }
    },
  });

  useEffect(() => {
    if (isChatBot) {
      let user_info;
      if (user) {
        user_info = {
          distinct_id: user.id, // Unique visitor ID in your system
          email: user.email, // visitor email
          name: user.username, // Visitor name
        };
      }
      chatWidget(user_info);
    }
  }, []);
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
        <div className={`container-sm ${styles['tab-container']}`}>
          {renderTab(selectedTab, latestBets, myBets, loading, error, isAuthorized)}
        </div>
      </div>
    </CSSTransition>
  );
};

export default SideBar;
