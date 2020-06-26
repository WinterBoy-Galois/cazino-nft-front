import React from 'react';
import styles from './Menu.module.scss';
import Present from '../../../../../icons/Present';
import Badge from '../../../../../Badge';
import { useStateValue } from '../../../../../../state';

interface IProps {
  hasUnclaimedBonus?: boolean;
}

const Menu: React.SFC<IProps> = ({ hasUnclaimedBonus }) => {
  const [, dispatch] = useStateValue();

  return (
    <div className={styles.container}>
      <div className={styles.menu}>Burger Menu</div>
      <div
        className={styles.item}
        onClick={() => dispatch({ type: 'SHOW_MODAL', payload: { type: 'USER_INFO_MODAL' } })}
      >
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
