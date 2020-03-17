import React from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';
import SidebarToggle from '../SidebarToggle';
import { useLockScroll } from '../../../../hooks/useLockScroll.hooks';

const SideBar: React.SFC = () => {
  const [{ sidebar }] = useStateValue();
  useLockScroll(sidebar.isOpen);

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
        <SidebarToggle />
      </div>
    </CSSTransition>
  );
};

export default SideBar;
