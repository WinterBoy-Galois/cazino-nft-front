import React from 'react';
import styles from './BottomBar.module.scss';
import Balance from '../Balance';
import BottomBarMenu from './components/Menu';

const BottomBar: React.SFC = () => {
  return (
    <div className={`container-fluid h-100`}>
      <div className={`row h-100`}>
        <div className={`col-12 ${styles.container}`}>
          <div>
            <BottomBarMenu hasUnclaimedBonus={true} />
          </div>
          <div className={styles.balance}>
            <Balance value="0.00000000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
