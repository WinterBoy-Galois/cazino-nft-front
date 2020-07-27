import React, { useCallback, useEffect } from 'react';
import { UserInfoModalWithData } from '../../../UserInfoModal';
import BetDetailsModal from '../../../BetDetailsModal';
import ChangeServerSeedConfirmationModal from '../../../ChangeServerSeedConfirmationModal';
import { SignInModalWithData } from '../../../SignInModal';
import { SignUpModalWithData } from '../../../SignUpModal';
import { useStateValue } from '../../../../state';
import { ModalType } from '../../../../state/models/modal.model';
import { AccountActivationModalWithData } from '../../../AccountActivationModal/AccountActivationModal';
import { useQueryParams } from '../../../../hooks/useQueryParams.hook';
import { mapQueryParamToModal } from './lib/modalQueryParamMapping';
import { PasswordResetModalWithData } from '../../../PasswordResetModal/PasswordResetModal';
import { PasswordRecoveryModalWithData } from '../../../PasswordRecoveryModal/PasswordRecoveryModal';

const Modals: React.FC = () => {
  const [{ modal }, dispatch] = useStateValue();
  const handleClose = useCallback(() => dispatch({ type: 'MODAL_HIDE' }), [dispatch]);
  const handleShow = useCallback((type: ModalType) => modal.type === type, [modal.type]);
  const params = useQueryParams();

  useEffect(() => {
    if (params?.dialog) {
      const modalType = mapQueryParamToModal(params.dialog);

      if (modalType) {
        dispatch({ type: 'MODAL_SHOW', payload: { type: modalType } });
      }
    }
  }, [params, dispatch]);

  return (
    <>
      <UserInfoModalWithData
        show={handleShow('USER_INFO_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <BetDetailsModal
        show={handleShow('BET_DETAILS_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <ChangeServerSeedConfirmationModal
        show={handleShow('CHANGE_SERVER_SEED_CONFIRMATION')}
        onClose={handleClose}
        {...modal.data}
      />
      <SignInModalWithData
        show={handleShow('SIGN_IN_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <SignUpModalWithData
        show={handleShow('SIGN_UP_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <AccountActivationModalWithData
        show={modal.type === 'ACCOUNT_ACTIVATION_MODAL'}
        onClose={handleClose}
        {...modal.data}
      />
      <PasswordResetModalWithData
        show={modal.type === 'PASSWORD_RESET_MODAL'}
        onClose={handleClose}
        {...modal.data}
      />
      <PasswordRecoveryModalWithData
        show={modal.type === 'PASSWORD_RECOVERY_MODAL'}
        onClose={handleClose}
        {...modal.data}
      />
    </>
  );
};

export default Modals;
