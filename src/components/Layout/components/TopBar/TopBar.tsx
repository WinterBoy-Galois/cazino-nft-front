import React from 'react';
import styles from './TopBar.module.scss';
import Logo from '../../../icons/Logo';

const TopBar: React.SFC = () => {
  return (
    <div className={`container-fluid h-100`}>
      <div className={`row h-100`}>
        <div className={`col-12 ${styles.center}`}>
          <a href="/">
            <Logo className={styles.logo__size} fillClassName={styles.logo__color} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
