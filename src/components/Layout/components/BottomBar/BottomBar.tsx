import React from 'react';
import styles from './BottomBar.module.scss';
import Balance from './components/Balance';
import BottomBarMenu from './components/Menu';
import { formatBitcoin } from '../../../../common/util/format.util';

interface IProps {
  hasUnclaimedBonus?: boolean;
  balance?: number;
  onClick?: () => void;
}

const BottomBar: React.FC<IProps> = ({ hasUnclaimedBonus = true, balance = 0.0, onClick }) => {
  return (
    <div className={`container-fluid h-100`}>
      <div className={`row h-100`}>
        <div className={`col-12 ${styles.container}`}>
          <div className="h-100">
            <BottomBarMenu hasUnclaimedBonus={hasUnclaimedBonus} />
          </div>
          <div className={styles.balance}>
            <Balance value={formatBitcoin(balance)} onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
