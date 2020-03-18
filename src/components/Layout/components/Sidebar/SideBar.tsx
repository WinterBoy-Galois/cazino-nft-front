import React from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';
import SidebarToggle from '../SidebarToggle';
import { useScrollLock } from '../../../../hooks/useScrollLock.hook';
import { Breakpoint, useBreakpoint } from '../../../../hooks/useBreakpoint.hook';

const SideBar: React.SFC = () => {
  const [{ sidebar }] = useStateValue();
  const breakpoint = useBreakpoint();
  useScrollLock(sidebar.isOpen && activateScrollLock(breakpoint));

  return (
    <CSSTransition
      in={sidebar.isOpen}
      timeout={200}
      classNames={{
        enter: styles['slide--enter'],
        enterDone: styles['slide--enter'],
        exit: styles['slide--exit'],
        exitDone: styles['slide--exit'],
      }}
    >
      <div className={`${styles.container} ${styles.slide}`}>
        <div className={styles.header}>
          <SidebarToggle />
          <h1 className={styles['header__headline']}>LIVE UPDATES</h1>
        </div>
        <div className={styles['tab-select']} />
      </div>
    </CSSTransition>
  );
};

export default SideBar;

const activateScrollLock = (breakpoint: Breakpoint): boolean => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
    case 'md':
      return true;

    default:
      return false;
  }
};
