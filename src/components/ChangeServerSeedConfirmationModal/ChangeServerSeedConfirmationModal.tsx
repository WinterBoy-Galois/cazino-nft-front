import React from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface IProps {
  show: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ChangeServerSeedConfirmationModal: React.FC<IProps> = ({
  show,
  onConfirm,
  onCancel,
}: IProps) => {
  return (
    <ConfirmationModal
      show={show}
      text={'Change server seed?'}
      onConfirmed={onConfirm}
      onCancelled={onCancel}
    />
  );
};

export default ChangeServerSeedConfirmationModal;
