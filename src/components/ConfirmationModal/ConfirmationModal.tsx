import React from 'react';
import Modal from '../Modal';
import styles from './ConfirmationModal.module.scss';
import { ButtonSize } from '../Button';
import HollowButton from '../HollowButton';
import Title from './components/Title';
import SpinnerButton from '../SpinnerButton';

interface IProps {
  show: boolean;
  text: string;
  onConfirmed?: () => void;
  onCancelled?: () => void;
  loading?: boolean;
}

const ConfirmationModal: React.FC<IProps> = ({
  show,
  onConfirmed,
  onCancelled,
  text,
  loading = false,
}) => {
  return (
    <Modal show={show} title={<Title />} onClose={onCancelled} modalClassName={styles.modal}>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>
        <div className={styles.button__container}>
          <div>
            <SpinnerButton
              className={`${styles.button} ${styles.button__confirm}`}
              onClick={onConfirmed}
              size={ButtonSize.LARGE}
              loading={loading}
            >
              Yes
            </SpinnerButton>
          </div>
          <div>
            <HollowButton
              className={`${styles.button} ${styles.button__cancel}`}
              onClick={onCancelled}
              size={ButtonSize.LARGE}
            >
              No
            </HollowButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
