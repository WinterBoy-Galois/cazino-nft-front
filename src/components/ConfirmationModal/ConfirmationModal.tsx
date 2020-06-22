import React from 'react';
import Modal from '../Modal';
import styles from './ConfirmationModal.module.scss';
import Button, { ButtonSize } from '../Button';
import HollowButton from '../HollowButton';
import Title from './components/Title';

interface IProps {
  show: boolean;
  text: string;
  onConfirmed?: () => void;
  onCancelled?: () => void;
}

const ConfirmationModal: React.SFC<IProps> = ({ show, onConfirmed, onCancelled, text }) => {
  return (
    <Modal show={show} title={<Title />} onClose={onCancelled} modalClassName={styles.modal}>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>
        <div className={styles.button__container}>
          <div>
            <Button
              className={`${styles.button} ${styles.button__confirm}`}
              onClick={onConfirmed}
              size={ButtonSize.LARGE}
            >
              Yes
            </Button>
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
