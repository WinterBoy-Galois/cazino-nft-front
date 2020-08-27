import React from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { useLocation, useNavigate } from '@reach/router';

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
  const location = useLocation();
  const navigate = useNavigate();

  if (show && (!onConfirm || !onCancel)) {
    navigate(location.pathname);
    return null;
  }

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
