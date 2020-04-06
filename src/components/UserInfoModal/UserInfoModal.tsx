import React from 'react';
import Modal from '../Modal';

interface IProps {
  show: boolean;
  onClose: () => void;
}

const UserInfoModal: React.SFC<IProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      User Info
    </Modal>
  );
};

export default UserInfoModal;
