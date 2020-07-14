import React from 'react';
import styles from './ToastContainer.module.scss';
import { appConfig } from '../../../../common/config';
import { ToastContainer as ToastifyToastContainer } from 'react-toastify';

const ToastContainer: React.FC = () => {
  return (
    <ToastifyToastContainer
      className={styles.container}
      hideProgressBar={appConfig.toastHideProgressbar}
      autoClose={appConfig.toastAutoCloseDuration}
      position={appConfig.toastPosition}
    />
  );
};

export default ToastContainer;
