import React from 'react';
import styles from './Layout.module.scss';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Sidebar from './components/Sidebar';
import Footer from '../Footer';
import { useStateValue } from '../../state';
import { UserInfoModalWithData } from '../UserInfoModal';
import { ModalState } from '../../state/models/modal.model';
import { Action } from '../../state/actions';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import BetDetailsModal from '../BetDetailsModal';
import ChangeServerSeedConfirmationModal from '../ChangeServerSeedConfirmationModal';

const renderModals = (modal: ModalState, dispatch: React.Dispatch<Action>) => (
  <>
    <UserInfoModalWithData
      show={modal.type === 'USER_INFO_MODAL'}
      onClose={() => dispatch({ type: 'HIDE_MODAL' })}
      {...modal.data}
    />
    <BetDetailsModal
      show={modal.type === 'BET_DETAILS_MODAL'}
      onClose={() => dispatch({ type: 'HIDE_MODAL' })}
      {...modal.data}
    />
    <ChangeServerSeedConfirmationModal
      show={modal.type === 'CHANGE_SERVER_SEED_CONFIRMATION'}
      onClose={() => dispatch({ type: 'HIDE_MODAL' })}
      {...modal.data}
    />
  </>
);

const Layout: React.SFC = ({ children }) => {
  const [{ sidebar, modal }, dispatch] = useStateValue();
  const mainWidth = document.getElementById('main')?.clientWidth;
  const breakpoint = useBreakpoint();

  const hideContent = () =>
    breakpoint === 'xs' || breakpoint === 'sm' ? sidebar.isOpen || modal.type !== 'NONE' : false;

  return (
    <>
      <div className={styles.wrapper}>
        <div
          id="main"
          className={`${styles.main} ${sidebar.isOpen && styles['main--sidebar-open']}`}
        >
          <div
            className={`${styles['main__top-bar']} ${
              sidebar.isOpen && styles['main__top-bar--sidebar-open']
            }`}
            style={{ width: modal.type !== 'NONE' ? `${mainWidth}px` : '' }}
          >
            <TopBar />
          </div>
          <div
            className={styles.main__content}
            style={{ display: hideContent() ? 'none' : 'block' }}
          >
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

      {renderModals(modal, dispatch)}
    </>
  );
};

export default Layout;
