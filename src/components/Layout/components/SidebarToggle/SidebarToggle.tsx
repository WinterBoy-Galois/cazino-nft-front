import React from 'react';
import styles from './SidebarToggle.module.scss';
import Arrow from '../../../icons/Arrow';
import { useStateValue } from '../../../../state';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  show: boolean;
  arrowLeft?: boolean;
}

const SidebarToggle: React.FC<IProps> = ({ show, arrowLeft }) => {
  const [, dispatch] = useStateValue();

  return (
    <CSSTransition
      in={show}
      timeout={200}
      classNames={{
        enter: styles['fade--enter'],
        enterActive: styles['fade--enter-active'],
        exit: styles['fade--exit'],
        exitActive: styles['fade--exit-active'],
      }}
      unmountOnExit={true}
    >
      <button
        className={`${styles.button} ${styles.fade}`}
        onClick={() => dispatch({ type: 'SIDEBAR_TOGGLE' })}
        style={{ transform: arrowLeft ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <Arrow className={styles.icon} />
      </button>
    </CSSTransition>
  );
};

export default SidebarToggle;
