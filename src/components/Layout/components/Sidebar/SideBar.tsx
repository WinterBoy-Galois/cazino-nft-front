import React from 'react';
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
        <div className={`container ${styles['tab-container']}`}>{renderTab(selectedTab)}</div>
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

const renderTab = (tab: SidebarTab) => {
  switch (tab) {
    case 'LATEST_BETS':
      return <LatestBetsTab />;
    case 'MY_BETS':
      return <MyBetsTab />;
    case 'LEADERBOARDS':
      return <LeaderboardsTab />;
  }
};
