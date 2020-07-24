import React from 'react';
import styles from './ToastContainer.module.scss';
import { appConfig } from '../../../../common/config';
import { ToastContainer as ToastifyToastContainer } from 'react-toastify';
import Close from '../../../icons/Close';

interface IProps {
  autoClose?: boolean;
}

const ToastContainer: React.FC<IProps> = ({ autoClose = true }) => {
  return (
    <ToastifyToastContainer
      className={styles.container}
      hideProgressBar={appConfig.toastHideProgressbar}
      autoClose={autoClose ? appConfig.toastAutoCloseDuration : false}
      position={appConfig.toastPosition}
      closeButton={() => (
        <button type="button" className={styles.close__button}>
          <Close className={styles.close__icon} />
        </button>
      )}
    />
  );
};

export default ToastContainer;
