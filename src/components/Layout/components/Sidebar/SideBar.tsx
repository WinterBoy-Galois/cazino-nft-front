import React from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';
import SidebarToggle from '../SidebarToggle';
import { useScrollLock } from '../../../../hooks/useScrollLock.hook';
import { Breakpoint, useBreakpoint } from '../../../../hooks/useBreakpoint.hook';
import { SidebarTab } from '../../../../state/models/sidebar.model';
import TabSelect from './components/TabSelect/TabSelect';

const SideBar: React.SFC = () => {
  const [
    {
      sidebar: { isOpen, selectedTab },
    },
  ] = useStateValue();
  const breakpoint = useBreakpoint();
  useScrollLock(isOpen && activateScrollLock(breakpoint));

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames={{
        enter: styles['slide--enter'],
        enterDone: styles['slide--enter'],
        exit: styles['slide--exit'],
        exitDone: styles['slide--exit'],
      }}
      appear={true}
    >
      <div className={`${styles.container} ${styles.slide}`}>
        <div className={styles.header}>
          <SidebarToggle />
          <h1 className={styles['header__headline']}>LIVE UPDATES</h1>
        </div>
        <div className={styles['tab-select']}>
          <TabSelect />
        </div>
        <div>{renderTab(selectedTab)}</div>
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
      return <div>Latest bets</div>;
    case 'MY_BETS':
      return <div>My bets</div>;
    case 'LEADERBOARDS':
      return <div>Leaderboards</div>;
  }
};
