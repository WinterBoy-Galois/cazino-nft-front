import React from 'react';
import styles from './SidebarToggle.module.scss';
import Arrow from '../../../icons/Arrow';
import { useStateValue } from '../../../../state';

const SidebarToggle: React.SFC = () => {
  const [, dispatch] = useStateValue();

  return (
    <button className={styles.button} onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
      <Arrow className={styles.icon} />
    </button>
  );
};

export default SidebarToggle;
