import React, { useState, useEffect } from 'react';
import styles from './Menu.module.scss';
import Present from '../../../../../icons/Present';
import Badge from '../../../../../Badge';
import Book from '../../../../../icons/Book';
import VerifyLast from '../../../../../icons/VerifyLast';
import Hamburger from '../../../../../icons/Hamburger';
import Faucet from '../../../../../icons/Faucet';
import { useStateValue } from '../../../../../../state';
import clsx from 'clsx';
import { useLocation, useNavigate } from '@reach/router';
import { useQuery } from '@apollo/client';
import { FAUCET_INFO } from '../../../../../../graphql/queries';

interface IProps {
  hasUnclaimedBonus?: boolean;
}

const Menu: React.FC<IProps> = ({ hasUnclaimedBonus }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isGamePage, setGamePage] = useState(false);
  const [{ auth }, dispatch] = useStateValue();
  const [isMenuOpened, setMenuOpened] = useState(false);
  const { refetch: refreshFaucetData } = useQuery(FAUCET_INFO);

  useEffect(() => {
    setGamePage(pathname.includes('/games'));
  }, [pathname]);

  const onOpenFaucetModal = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    refreshFaucetData().then(async response => {
      await navigate(`${pathname}?dialog=faucet`, {
        state: {
          amount: response.data?.faucetInfo.amount || 0,
          canClaim: response.data?.faucetInfo.canClaim || false,
          every: response.data?.faucetInfo.every || 0,
          timestamp: new Date(),
        },
      });
    });
  };

  return (
    <div className={styles.container}>
      {isGamePage && isMenuOpened ? (
        <div className={styles.hamburger_menu}>
          <div className={clsx(styles.item, styles.hamburger_menu__item)}>
            <Book className={styles.item__icon} />
          </div>

          <div className={clsx(styles.item, styles.hamburger_menu__item)}>
            <VerifyLast className={styles.item__icon} />
          </div>

          <div
            className={clsx(styles.item, styles.hamburger_menu__item)}
            onClick={onOpenFaucetModal}
          >
            <Faucet className={styles.item__icon} />
          </div>
        </div>
      ) : null}

      {isGamePage ? (
        <div
          className={clsx(styles.item, styles.item__hidden_lg_up)}
          onClick={() => setMenuOpened(!isMenuOpened)}
        >
          <Hamburger className={styles.item__icon} isOpened={isMenuOpened} />
        </div>
      ) : null}

      <div
        className={styles.item}
        onClick={() => dispatch({ type: 'MODAL_SHOW', payload: { type: 'USER_INFO_MODAL' } })}
      >
        <Present className={styles.item__icon} />
        {hasUnclaimedBonus ? (
          <div className={styles.item__badge}>
            <Badge />
          </div>
        ) : null}
      </div>

      {isGamePage ? (
        <>
          <div className={clsx(styles.item, styles.item__hidden_md_down)}>
            <Book className={styles.item__icon} />
          </div>

          <div className={clsx(styles.item, styles.item__hidden_md_down)}>
            <VerifyLast className={styles.item__icon} />
          </div>

          <div
            className={clsx(styles.item, styles.item__hidden_md_down)}
            onClick={onOpenFaucetModal}
          >
            <Faucet className={styles.item__icon} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Menu;
