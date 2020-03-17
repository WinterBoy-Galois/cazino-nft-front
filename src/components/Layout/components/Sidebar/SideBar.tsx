import React from 'react';
import styles from './SideBar.module.scss';
import { useStateValue } from '../../../../state';

const SideBar: React.SFC = () => {
  const [{ sidebar }, dispatch] = useStateValue();

  return sidebar.isOpen ? (
    <div className={styles.container}>
      Sidebar{' '}
      <button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
        {sidebar.isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  ) : null;
};

export default SideBar;
