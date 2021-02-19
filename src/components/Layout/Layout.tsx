import React, { useState, useEffect, useCallback } from 'react';
import styles from './Layout.module.scss';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Sidebar from './components/Sidebar';
import Footer from '../Footer';
import { useStateValue } from '../../state';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { transitionTimeout } from '../Modal';
import { useMutation } from '@apollo/client';
import { SIGN_OUT } from '../../graphql/mutations';
import Modals from './components/Modals';
import { navigate, useLocation } from '@reach/router';
import useRealtimeBalance from '../../hooks/useRealtimeBalance.hook';
import { BONUSCLAIMS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const Layout: React.FC = ({ children }) => {
  useRealtimeBalance();

  const [hasUnclaimedBonus, setHasUnclaimedBonus] = useState(false);
  const [{ sidebar, modal, auth }, dispatch] = useStateValue();
  const mainWidth = document.getElementById('main')?.clientWidth;
  const breakpoint = useBreakpoint();
  const [signOut] = useMutation(SIGN_OUT);
  const { pathname } = useLocation();
  const { data: bonusClaims } = useQuery(BONUSCLAIMS);

  const hideContent = () =>
    breakpoint === 'xs' || breakpoint === 'sm' ? modal.type !== 'NONE' : false;

  const handleSignInClick = useCallback(() => navigate(`${pathname}?dialog=sign-in`), [pathname]);

  const handleSignOutClick = async () => {
    await signOut();
    dispatch({ type: 'AUTH_SIGN_OUT' });
  };

  const handleBalanceClick = useCallback(
    () => auth.state === 'SIGNED_IN' && navigate(`${pathname}?dialog=cashier`),
    [pathname, auth.state]
  );

  useEffect(() => {
    if (bonusClaims && bonusClaims?.bonusClaims.length) setHasUnclaimedBonus(true);
    else setHasUnclaimedBonus(false);
  }, [bonusClaims]);

  return (
    <>
      <div className={styles.wrapper} style={{ display: hideContent() ? 'none' : 'block' }}>
        <div
          id="main"
          className={`${styles.main} ${sidebar.isOpen && styles['main--sidebar-open']}`}
        >
          <div
            className={`${styles['main__top-bar']} ${
              sidebar.isOpen && styles['main__top-bar--sidebar-open']
            }`}
            style={{
              width: modal.type !== 'NONE' ? `${mainWidth}px` : '',
              transitionDuration: modal.type === 'NONE' ? `${transitionTimeout}` : '0s',
            }}
          >
            <TopBar onSignInClick={handleSignInClick} onSignOutClick={handleSignOutClick} />
          </div>
          <div className={styles.main__content}>
            {children}
            <Footer />
          </div>
          <div
            className={`${styles['main__bottom-bar']} ${
              sidebar.isOpen && styles['main__bottom-bar--sidebar-open']
            }`}
            style={{
              width: modal.type !== 'NONE' ? `${mainWidth}px` : '',
              transition: modal.type !== 'NONE' ? 'none' : '',
            }}
          >
            <BottomBar
              hasUnclaimedBonus={hasUnclaimedBonus}
              balance={auth.user?.balance}
              onClick={handleBalanceClick}
            />
          </div>
        </div>
      </div>

      <Sidebar />

      <Modals />
    </>
  );
};

export default Layout;
