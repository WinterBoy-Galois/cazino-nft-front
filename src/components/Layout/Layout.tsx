import React from 'react';
import styles from './Layout.module.scss';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Footer from '../Footer';

const Layout: React.SFC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles['main__top-bar']}>
          <TopBar />
        </div>
        <div className={styles.main__content}>
          {children}
          <Footer />
        </div>
        <div className={styles['main__bottom-bar']}>
          <BottomBar />
        </div>
      </div>
      <div className={styles['live-updates']}>live updates</div>
    </div>
  );
};

export default Layout;
