import React, { useCallback } from 'react';
import { UserInfoModalWithData } from '../../../UserInfoModal';
import BetDetailsModal from '../../../BetDetailsModal';
import ChangeServerSeedConfirmationModal from '../../../ChangeServerSeedConfirmationModal';
import { SignInModalWithData } from '../../../SignInModal';
import { SignUpModalWithData } from '../../../SignUpModal';
import { useStateValue } from '../../../../state';
import { ModalType } from '../../../../state/models/modal.model';
import { AccountActivationModalWithData } from '../../../AccountActivationModal/AccountActivationModal';

const Modals: React.FC = () => {
  const [{ modal }, dispatch] = useStateValue();
  const handleClose = useCallback(() => dispatch({ type: 'MODAL_HIDE' }), [dispatch]);
  const handleShow = useCallback((type: ModalType) => modal.type === type, [modal.type]);

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
        onClose={() => dispatch({ type: 'MODAL_HIDE' })}
        {...modal.data}
      />
    </>
  );
};

export default Modals;
