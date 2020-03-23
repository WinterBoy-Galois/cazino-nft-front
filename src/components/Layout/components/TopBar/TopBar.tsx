import React from 'react';
import styles from './TopBar.module.scss';
import Logo from '../../../icons/Logo';
import SidebarToggle from '../SidebarToggle';
import { useStateValue } from '../../../../state';

const TopBar: React.SFC = () => {
  const [{ sidebar }] = useStateValue();

  return (
    <div className={`container-fluid h-100`}>
      <div className={`row h-100`}>
        <div className={`col-6 ${styles.center}`}>
          <a href="/">
            <Logo className={styles.logo__size} fillClassName={styles.logo__color} />
          </a>
        </div>
        <div className={`col-6 ${styles.center} ${styles.right}`}>
          {!sidebar.isOpen && <SidebarToggle arrowLeft={true} />}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
