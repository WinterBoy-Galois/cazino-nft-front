import React from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';

const SideBar: React.SFC = () => {
  const [{ sidebar }, dispatch] = useStateValue();

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
        Sidebar{' '}
        <button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
          {sidebar.isOpen ? 'Close' : 'Open'}
        </button>
      </div>
    </CSSTransition>
  );
};

export default SideBar;
