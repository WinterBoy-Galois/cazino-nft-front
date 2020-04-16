import React from 'react';
import styles from './Modal.module.scss';
import Close from '../icons/Close';
import { CSSTransition } from 'react-transition-group';
import { useScrollLock } from '../../hooks/useScrollLock.hook';

interface IProps {
  children: React.ReactNode;
  title?: string;
  show: boolean;
  onClose?: () => void;
}

const Modal: React.SFC<IProps> = ({ title = '', show, children, onClose }) => {
  useScrollLock(show);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

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
      <div className={styles.container}>
        <CSSTransition
          in={show}
          timeout={200}
          classNames={{
            appear: styles['scale--enter'],
            appearActive: styles['scale--enter-active'],
            exit: styles['scale--exit'],
            exitActive: styles['scale--exit-active'],
          }}
          appear={true}
        >
          <div className={styles.modal}>
            <div className={styles.modal__header}>
              <div className={styles.modal__header__headline}>{title}</div>
              <div className={styles.modal__header__close} onClick={handleClose}>
                <Close className={`${styles.icon} ${styles.icon__close}`} />
              </div>
            </div>
            <div className={styles.modal__main}>{children}</div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default Modal;
