import React from 'react';
import styles from './Layout.module.scss';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Sidebar from './components/Sidebar';
import Footer from '../Footer';
import { useStateValue } from '../../state';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { transitionTimeout } from '../Modal';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_OUT } from '../../graphql/mutations';
import Modals from './components/Modals';
import { navigate, useLocation } from '@reach/router';

const Layout: React.FC = ({ children }) => {
  const [{ sidebar, modal }, dispatch] = useStateValue();
  const mainWidth = document.getElementById('main')?.clientWidth;
  const breakpoint = useBreakpoint();
  const [signOut] = useMutation(SIGN_OUT);
  const location = useLocation();

  const hideContent = () =>
    breakpoint === 'xs' || breakpoint === 'sm' ? modal.type !== 'NONE' : false;

  const handleSignInClick = () => navigate(`${location.pathname}?dialog=sign-in`);

  const handleSignOutClick = async () => {
    await signOut();
    dispatch({ type: 'AUTH_SIGN_OUT' });
  };

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
            <BottomBar />
          </div>
        </div>
      </div>

      <Sidebar />

      <Modals />
    </>
  );
};

export default Layout;
