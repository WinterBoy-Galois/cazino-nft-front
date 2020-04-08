import React from 'react';
import styles from './Layout.module.scss';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Sidebar from './components/Sidebar';
import Footer from '../Footer';
import { useStateValue } from '../../state';
import UserInfoModal from '../UserInfoModal';
import { ModalState } from '../../state/models/modal.model';
import { Action } from '../../state/actions';

const Layout: React.SFC = ({ children }) => {
  const [{ sidebar, modal }, dispatch] = useStateValue();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={`${styles.main} ${sidebar.isOpen && styles['main--sidebar-open']}`}>
          <div
            className={`${styles['main__top-bar']} ${sidebar.isOpen &&
              styles['main--sidebar-open']}`}
          >
            <TopBar />
          </div>
          <div className={styles.main__content}>
            {children}
            <Footer />
          </div>
          <div
            className={`${styles['main__bottom-bar']} ${sidebar.isOpen &&
              styles['main--sidebar-open']}`}
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

const renderModals = (modal: ModalState, dispatch: React.Dispatch<Action>) => (
  <>
    <UserInfoModal
      show={modal.type === 'USER_INFO_MODAL'}
      onClose={() => dispatch({ type: 'HIDE_MODAL' })}
      {...modal.data}
    />
  </>
);
