import React, { useCallback, useEffect } from 'react';
import { UserInfoModalWithData } from '../../../UserInfoModal';
import BetDetailsModal from '../../../BetDetailsModal';
// import WithdrawalDetailsModal from '../../../WithdrawalDetailsModal';
import BonusDetailsModal from '../../../BonusDetailsModal';
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
import { ChangeServerSeedConfirmationModalWithData } from '../../../ChangeServerSeedConfirmationModal/ChangeServerSeedConfirmationModal';
import { CashierModalWithData } from '../../../CashierModal/CashierModal';
import { ProfitCutModalWithData } from '../../../ProfitCutModal/ProfitCutModal';
import { FaucetModalWithData } from '../../../FaucetModal/FaucetModal';
import DepositsDetailsModal from '../../../DepositsDetailsModal';
import AffiliatesDetailsModal from '../../../AffiliatesDettailsModal';
import { toggleShowModalAction } from '../../../../user/user.actions';
import { useUserState } from '../../../../user/UserProvider';
import { GameModal } from '../../../../pages/GamesPage/components/GameModal';

const Modals: React.FC = () => {
  const [{ modal }, dispatch] = useStateValue();
  const [{ showLoginModal }, userDispatch] = useUserState();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = useCallback(() => navigate(location.pathname), [location.pathname, navigate]);
  const handleCloseReLogin = () => {
    userDispatch(toggleShowModalAction(false));
    return navigate('/');
  };
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
        replaceModal(dispatch, newModalType, { ...(location.state as any), key: undefined });
      } else if (currentModalType === 'NONE' && !modal.isReplace) {
        showModal(dispatch, newModalType, { ...(location.state as any), key: undefined });
      }
    } else if (currentModalType !== 'NONE') {
      closeModal(dispatch);
    }
  }, [params, dispatch, modal.type, modal.isReplace, location.state]);

  return (
    <>
      <GameModal show={handleShow('GAME_MODAL')} onClose={handleClose} {...modal.data} />
      <SignInModalWithData show={showLoginModal} onClose={handleCloseReLogin} />
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
      {/* <WithdrawalDetailsModal
        show={handleShow('WITHDRAWAL_DETAILS_MODAL')}
        onClose={handleClose}
        {...modal.data}
      /> */}
      <BonusDetailsModal
        show={handleShow('BONUS_DETAILS_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <AffiliatesDetailsModal
        show={handleShow('AFFILIATES_DETAILS_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <ChangeServerSeedConfirmationModalWithData
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
      <CashierModalWithData
        show={handleShow('CASHIER_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <DepositsDetailsModal
        show={handleShow('DEPOSIT_DETAILS_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <ProfitCutModalWithData
        show={handleShow('PROFIT_CUT_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
      <FaucetModalWithData
        show={handleShow('FAUCET_MODAL')}
        onClose={handleClose}
        {...modal.data}
      />
    </>
  );
};

export default Modals;
