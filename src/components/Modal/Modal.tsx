import React, { useState } from 'react';
import './Modal.scss';
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
    <div>
      <CSSTransition in={show} timeout={200} classNames="modal__fade" unmountOnExit={true}>
        <div className="modal">
          <CSSTransition timeout={200} classNames="modal__scale">
            <div className="modal__container">
              <div className="modal__header">
                <div className="modal__headline">{title}</div>
                <div onClick={handleClose}>
                  <Close className="modal__icon modal__icon__close" />
                </div>
              </div>
              <div className="modal__main">{children}</div>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Modal;
