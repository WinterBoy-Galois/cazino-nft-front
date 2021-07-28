import React, { useCallback } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { useLocation, useNavigate } from '@reach/router';
import { useMutation } from '@apollo/client';
import { CHANGE_SERVER_SEED } from '../../graphql/mutations';
import { useTranslation } from 'react-i18next';

interface IProps {
  show: boolean;
  confirmPath: string;
  confirmState?: any;
  cancelPath: string;
  cancelState?: any;
  onChangeServerSeed?: () => Promise<any>;
  loading?: boolean;
}

const ChangeServerSeedConfirmationModal: React.FC<IProps> = ({
  show,
  confirmPath,
  confirmState,
  cancelState,
  cancelPath,
  onChangeServerSeed = () => Promise.resolve(),
  loading = false,
}: IProps) => {
  const { t } = useTranslation(['seeds']);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    await onChangeServerSeed();
    navigate(confirmPath, { state: confirmState });
  };

  const handleCancel = useCallback(() => navigate(cancelPath, { state: cancelState }), [
    navigate,
    cancelPath,
    cancelState,
  ]);

  if (show && (!confirmPath || !cancelPath)) {
    navigate(pathname);
    return null;
  }

  return (
    <ConfirmationModal
      show={show}
      text={t('change_server_seed')}
      onConfirmed={handleConfirm}
      onCancelled={handleCancel}
      loading={loading}
    />
  );
};

export default ChangeServerSeedConfirmationModal;

export const ChangeServerSeedConfirmationModalWithData: React.FC<IProps> = props => {
  const [changeServerSeed, { loading }] = useMutation(CHANGE_SERVER_SEED);

  return (
    <ChangeServerSeedConfirmationModal
      {...props}
      onChangeServerSeed={changeServerSeed}
      loading={loading}
    />
  );
};
