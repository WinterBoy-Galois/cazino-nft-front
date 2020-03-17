import React from 'react';
import styles from './SidebarToggle.module.scss';
import Arrow from '../../../icons/Arrow';
import { useStateValue } from '../../../../state';

interface IProps {
  arrowLeft?: boolean;
}

const SidebarToggle: React.SFC<IProps> = ({ arrowLeft }) => {
  const [, dispatch] = useStateValue();

  return (
    <button
      className={styles.button}
      onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      style={{ transform: arrowLeft ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <div>
        <Arrow className={styles.icon} />
      </div>
    </button>
  );
};

export default SidebarToggle;
