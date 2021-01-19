import React, { useRef, useEffect, ReactNode, RefObject } from 'react';
import styles from './Modal.module.scss';
import Close from '../icons/Close';
import Warning from '../icons/Warning';
import { CSSTransition } from 'react-transition-group';
import { useScrollLock } from '../../hooks/useScrollLock.hook';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import Div100vh from 'react-div-100vh';
import clsx from 'clsx';

interface IProps {
  children: ReactNode;
  title?: ReactNode;
  show: boolean;
  onClose?: () => void;
  footer?: ReactNode;
  mainRef?: RefObject<HTMLDivElement>;
  modalClassName?: string;
}

export const transitionTimeout = 200;

const Modal: React.FC<IProps> = ({
  title = '',
  show,
  children,
  onClose,
  footer,
  mainRef,
  modalClassName = '',
}) => {
  useScrollLock(show);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, handleClose);

  useEffect(() => {
    const handleEscKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => document.removeEventListener('keydown', handleEscKeydown);
  });

  return (
    <CSSTransition
      in={show}
      timeout={transitionTimeout}
      classNames={{
        enter: styles['fade--enter'],
        enterActive: styles['fade--enter-active'],
        exit: styles['fade--exit'],
        exitActive: styles['fade--exit-active'],
      }}
      unmountOnExit
    >
      <Div100vh className={styles.container}>
        <CSSTransition
          in={show}
          timeout={transitionTimeout}
          classNames={{
            appear: styles['scale--enter'],
            appearActive: styles['scale--enter-active'],
            exit: styles['scale--exit'],
            exitActive: styles['scale--exit-active'],
          }}
          appear
        >
          <div
            role="dialog"
            aria-modal="true"
            className={`${modalClassName} ${styles.modal}`}
            ref={modalRef}
          >
            <div className={styles.modal__header}>
              <div className={styles.modal__header__headline}>
                {modalClassName === 'warning' ? (
                  <Warning className={clsx(styles.icon, styles.icon__warning)} />
                ) : null}
                {title}
              </div>
              <div className={styles.modal__header__close} onClick={handleClose}>
                <Close className={`${styles.icon} ${styles.icon__close}`} />
              </div>
            </div>
            <div ref={mainRef} className={styles.modal__main}>
              {children}
            </div>
            {footer && <div className={styles.modal__footer}>{footer}</div>}
          </div>
        </CSSTransition>
      </Div100vh>
    </CSSTransition>
  );
};

export default Modal;
