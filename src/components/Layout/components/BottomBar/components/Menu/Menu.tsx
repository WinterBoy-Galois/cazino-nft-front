import React, { useState, useEffect } from 'react';
import styles from './Menu.module.scss';
import Present from '../../../../../icons/Present';
import Badge from '../../../../../Badge';
import Book from '../../../../../icons/Book';
import VerifyLast from '../../../../../icons/VerifyLast';
import Hamburger from '../../../../../icons/Hamburger';
import Faucet from '../../../../../icons/Faucet';
import Sound from '../../../../../icons/Sound';
import { useStateValue } from '../../../../../../state';
import clsx from 'clsx';
import { useLocation, useNavigate } from '@reach/router';
import { useQuery } from '@apollo/client';
import { FAUCET_INFO } from '../../../../../../graphql/queries';
import { error as errorToast } from '../../../../../../components/Toast';
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

  const [
    {
      sidebar: { isOpen, isSound },
    },
  ] = useStateValue();
  useEffect(() => {
    setGamePage(pathname.includes('/games'));
  }, [pathname]);
  useEffect(() => {
    setMenuOpened(false);
  }, [isOpen]);
  const onOpenFaucetModal = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    refreshFaucetData()
      .then(async response => {
        const { amount, canClaim, every, errors } = response.data.faucetInfo;

        if (errors) {
          if (errors[0].code === 'FAUCET_CLAIM_DISABLED') {
            return await navigate(`${pathname}?dialog=faucet`, {
              state: {
                errMessage: errors[0].message,
                timestamp: new Date(),
              },
            });
          } else {
            return errorToast(errors[0].message);
          }
        }

        return await navigate(`${pathname}?dialog=faucet`, {
          state: {
            amount: amount || 0,
            canClaim: canClaim || false,
            every: every || 0,
            timestamp: new Date(),
          },
        });
      })
      .catch(err => err);
  };

  const onClickSound = () => {
    dispatch({ type: 'SOUND_ON_OFF', payload: { isSound: !isSound } });
  };

  return (
    <div className={styles.container}>
      {isGamePage && isMenuOpened ? (
        <div className={clsx(isOpen ? styles.hamburger_menu_open : styles.hamburger_menu)}>
          <div
            className={clsx(
              isOpen ? styles.item_menu_open : styles.item_menu,
              styles.hamburger_menu__item
            )}
          >
            <Book className={clsx(isOpen ? styles.item_menu_open__icon : styles.item_menu__icon)} />
          </div>

          <div
            className={clsx(
              isOpen ? styles.item_menu_open : styles.item_menu,
              styles.hamburger_menu__item
            )}
          >
            <VerifyLast
              className={clsx(isOpen ? styles.item_menu_open__icon : styles.item_menu__icon)}
            />
          </div>

          <div
            className={clsx(
              isOpen ? styles.item_menu_open : styles.item_menu,
              styles.hamburger_menu__item
            )}
            onClick={onOpenFaucetModal}
          >
            <Faucet
              className={clsx(isOpen ? styles.item_menu_open__icon : styles.item_menu__icon)}
            />
          </div>

          <div
            className={clsx(
              isOpen ? styles.item_menu_open : styles.item_menu,
              styles.hamburger_menu__item
            )}
            onClick={onClickSound}
          >
            <Sound
              className={clsx(isOpen ? styles.item_menu_open__icon : styles.item_menu__icon)}
              sound={isSound}
            />
          </div>
        </div>
      ) : null}

      {isGamePage ? (
        <div
          className={clsx(
            isOpen
              ? clsx(styles.item_open, styles.item_open__hidden_lg_up)
              : clsx(styles.item, styles.item__hidden_lg_up)
          )}
          onClick={() => setMenuOpened(!isMenuOpened)}
        >
          <Hamburger
            className={clsx(isOpen ? styles.item_open__icon : styles.item__icon)}
            isOpened={isMenuOpened}
          />
        </div>
      ) : null}

      <div
        className={clsx(isOpen ? styles.item_open : styles.item)}
        onClick={() => dispatch({ type: 'MODAL_SHOW', payload: { type: 'USER_INFO_MODAL' } })}
      >
        <Present className={styles.item__icon} />
        {hasUnclaimedBonus ? (
          <div className={clsx(isOpen ? styles.item_open__badge : styles.item__badge)}>
            <Badge />
          </div>
        ) : null}
      </div>

      {isGamePage ? (
        <>
          <div
            className={clsx(
              isOpen
                ? clsx(styles.item_open, styles.item_open__hidden_md_down)
                : clsx(styles.item, styles.item__hidden_md_down)
            )}
          >
            <Book className={clsx(isOpen ? styles.item_open__icon : styles.item__icon)} />
          </div>

          <div
            className={clsx(
              isOpen
                ? clsx(styles.item_open, styles.item_open__hidden_md_down)
                : clsx(styles.item, styles.item__hidden_md_down)
            )}
          >
            <VerifyLast className={clsx(isOpen ? styles.item_open__icon : styles.item__icon)} />
          </div>

          <div
            className={clsx(
              isOpen
                ? clsx(styles.item_open, styles.item_open__hidden_md_down)
                : clsx(styles.item, styles.item__hidden_md_down)
            )}
            onClick={onOpenFaucetModal}
          >
            <Faucet className={clsx(isOpen ? styles.item_open__icon : styles.item__icon)} />
          </div>

          <div
            className={clsx(
              isOpen
                ? clsx(styles.item_open, styles.item_open__hidden_md_down)
                : clsx(styles.item, styles.item__hidden_md_down)
            )}
            onClick={onClickSound}
          >
            <Sound
              className={clsx(isOpen ? styles.item_open__icon : styles.item__icon)}
              sound={isSound}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Menu;
