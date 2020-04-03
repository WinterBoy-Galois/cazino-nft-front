import React from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';
import SidebarToggle from '../SidebarToggle';
import { useScrollLock } from '../../../../hooks/useScrollLock.hook';
import { Breakpoint, useBreakpoint } from '../../../../hooks/useBreakpoint.hook';
import { SidebarTab } from '../../../../state/models/sidebar.model';
import TabSelect from './components/TabSelect/TabSelect';
import BetTable from '../../../BetTable';
import LeaderboardsTab from './components/LeaderboardsTab';
import { useTranslation } from 'react-i18next';

const SideBar: React.SFC = () => {
  const [
    {
      sidebar: { isOpen, selectedTab },
    },
  ] = useStateValue();
  const breakpoint = useBreakpoint();
  useScrollLock(isOpen && activateScrollLock(breakpoint), false);
  const { t } = useTranslation(['sidebar']);

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
    >
      <div className={`${styles.container} ${styles.slide}`}>
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
      return <BetTable bets={[]} isLoading={false} error={false} />;
    case 'MY_BETS':
      return <div>My bets</div>;
    case 'LEADERBOARDS':
      return <LeaderboardsTab />;
  }
};
