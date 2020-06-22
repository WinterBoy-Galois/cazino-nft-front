import React from 'react';
import Modal from '../Modal';
import styles from './ConfirmationModal.module.scss';
import Button from '../Button';
import HollowButton from '../HollowButton';

interface IProps {
  show: boolean;
  text: string;
  onConfirmed?: () => void;
  onCancelled?: () => void;
}

const ConfirmationModal: React.SFC<IProps> = ({ show, onConfirmed, onCancelled, text }) => {
  return (
    <Modal show={show} title={'Confirm'} onClose={onCancelled} modalClassName={styles.modal}>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>
        <Button className={`${styles.button} ${styles.button__confirm}`} onClick={onConfirmed}>
          Yes
        </Button>
        <HollowButton className={`${styles.button} ${styles.button__cancel}`} onClick={onCancelled}>
          No
        </HollowButton>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
