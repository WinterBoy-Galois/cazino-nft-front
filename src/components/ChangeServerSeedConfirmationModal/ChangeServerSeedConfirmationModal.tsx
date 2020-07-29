import React from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { Redirect, useLocation } from '@reach/router';

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

  if (show && (!onConfirm || !onCancel)) {
    return <Redirect noThrow to={`${location.pathname}`} />;
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
