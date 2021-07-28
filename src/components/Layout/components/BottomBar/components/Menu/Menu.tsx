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
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { FAUCET_INFO, RECENT_BETS } from '../../../../../../graphql/queries';
import { error as errorToast } from '../../../../../../components/Toast';
import Bet from '../../../../../../models/bet.model';
import { BET_ADDED } from '../../../../../../graphql/subscriptions';
import { useIsAuthorized } from '../../../../../../hooks/useIsAuthorized';
import { useUserState } from '../../../../../../user/UserProvider';
interface IProps {
  hasUnclaimedBonus?: boolean;
}

const Menu: React.FC<IProps> = ({ hasUnclaimedBonus }) => {
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isGamePage, setGamePage] = useState(false);
  const [{ user, accessToken }] = useUserState();

  const [isMenuOpened, setMenuOpened] = useState(false);
  const [fetchFaucetInfo, { refetch: refreshFaucetData }] = useLazyQuery(FAUCET_INFO);
  const [userLastBet, setUserLastBet] = useState<Bet | null>(null);

  useEffect(() => {
    if (isAuthorized && accessToken) {
      fetchFaucetInfo();
    }
  }, [accessToken]);

  const [
    {
      sidebar: { isOpen, isSound },
    },
    dispatch,
  ] = useStateValue();
  useEffect(() => {
    setGamePage(pathname.includes('/games'));
  }, [pathname]);
  useEffect(() => {
    setMenuOpened(false);
  }, [isOpen]);
  const onOpenFaucetModal = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    refreshFaucetData?.()
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

  const onBonusLink = () => {
    dispatch({
      type: 'MODAL_SHOW',
      payload: { type: 'USER_INFO_MODAL' },
    });
  };

  const onClickSound = () => {
    dispatch({ type: 'SOUND_ON_OFF', payload: { isSound: !isSound } });
  };

  useSubscription(BET_ADDED, {
    onSubscriptionData: data => {
      const betAdded: Bet = data?.subscriptionData?.data?.betAdded;
      if (betAdded) {
        if (user?.id === betAdded.userid.toString()) {
          setUserLastBet(betAdded);
        }
      }
    },
  });

  useQuery(RECENT_BETS, {
    onCompleted: data => {
      setUserLastBet(data?.recentBets?.myBets?.[0]);
    },
  });

  const onClickVerifyLast = () => {
    if (!userLastBet) return;
    navigate(`${pathname}?dialog=bet-details`, { state: { bet: userLastBet, activePage: 2 } });
  };

  return (
    <div className={clsx(styles.container, 'h-100')}>
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
              userLastBet ? styles.hamburger_menu__item : styles.hamburger_menu__item__disable
            )}
            onClick={onClickVerifyLast}
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

      <a
        className={clsx(isOpen ? styles.item_open : styles.item)}
        onClick={onBonusLink}
        href="/bonuses"
      >
        <Present className={styles.item__icon} />
        {hasUnclaimedBonus ? (
          <div className={clsx(isOpen ? styles.item_open__badge : styles.item__badge)}>
            <Badge />
          </div>
        ) : null}
      </a>

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
                : clsx(styles.item, styles.item__hidden_md_down),
              userLastBet ? styles.hamburger_menu__item : styles.hamburger_menu__item__disable
            )}
            onClick={onClickVerifyLast}
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
