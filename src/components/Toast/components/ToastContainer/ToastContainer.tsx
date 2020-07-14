import React from 'react';
import styles from './ToastContainer.module.scss';
import { appConfig } from '../../../../common/config';
import { ToastContainer as ToastifyToastContainer } from 'react-toastify';

interface IProps {
  autoClose?: boolean;
}

const ToastContainer: React.FC<IProps> = ({ autoClose = false }) => {
  return (
    <ToastifyToastContainer
      className={styles.container}
      hideProgressBar={appConfig.toastHideProgressbar}
      autoClose={autoClose ? appConfig.toastAutoCloseDuration : false}
      position={appConfig.toastPosition}
    />
  );
};

export default ToastContainer;
