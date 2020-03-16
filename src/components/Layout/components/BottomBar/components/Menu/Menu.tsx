import React from 'react';
import styles from './Menu.module.scss';
import Present from '../../../../../icons/Present';
import Badge from '../../../../../Badge';

interface IProps {
  hasUnclaimedBonus?: boolean;
}

const Menu: React.SFC<IProps> = ({ hasUnclaimedBonus }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>Burger Menu</div>
      <div className={styles.item}>
        <Present className={styles.item__icon} />
        {hasUnclaimedBonus ? (
          <div className={styles.item__badge}>
            <Badge />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
