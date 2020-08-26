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
import { closeModal, replaceModal, showModal } from '../../../Modal';
import { useLocation, useNavigate } from '@reach/router';

const Modals: React.FC = () => {
  const [{ modal }, dispatch] = useStateValue();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = useCallback(() => navigate(location.pathname), [location.pathname, navigate]);
  const handleShow = useCallback((type: ModalType) => modal.type === type, [modal.type]);
  const params = useQueryParams();

  useEffect(() => {
    const currentModalType = modal.type;

    if (params?.dialog) {
      const newModalType = mapQueryParamToModal(params.dialog);

      if (!newModalType) {
        return;
      }

      if (currentModalType !== 'NONE' && newModalType !== currentModalType) {
        replaceModal(dispatch, newModalType, { ...location.state, key: undefined });
      } else if (currentModalType === 'NONE' && !modal.isReplace) {
        showModal(dispatch, newModalType, { ...location.state, key: undefined });
      }
    } else if (!params?.dialog && currentModalType !== 'NONE') {
      closeModal(dispatch);
    }
  }, [params, dispatch, modal.type, modal.isReplace, location.state]);

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
        show={handleShow('ACCOUNT_ACTIVATION_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <PasswordResetModalWithData
        show={handleShow('PASSWORD_RESET_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <PasswordRecoveryModalWithData
        show={handleShow('PASSWORD_RECOVERY_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
    </>
  );
};

export default Modals;
