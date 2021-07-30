import { ModalType } from '../../../../../state/models/modal.model';

export const mapQueryParamToModal = (param: string): ModalType | undefined => {
  switch (param) {
    case 'game-modal':
      return 'GAME_MODAL';
    case 'sign-in':
      return 'SIGN_IN_MODAL';

    case 'sign-up':
      return 'SIGN_UP_MODAL';

    case 'activation':
      return 'ACCOUNT_ACTIVATION_MODAL';

    case 'password-reset':
      return 'PASSWORD_RESET_MODAL';

    case 'password-recovery':
      return 'PASSWORD_RECOVERY_MODAL';

    case 'bet-details':
      return 'BET_DETAILS_MODAL';

    case 'withdrawal-details':
      return 'WITHDRAWAL_DETAILS_MODAL';

    case 'bonus-details':
      return 'BONUS_DETAILS_MODAL';

    case 'user-info':
      return 'USER_INFO_MODAL';

    case 'seed-confirm':
      return 'CHANGE_SERVER_SEED_CONFIRMATION';

    case 'cashier':
      return 'CASHIER_MODAL';

    case 'deposit-details':
      return 'DEPOSIT_DETAILS_MODAL';

    case 'profit-cut':
      return 'PROFIT_CUT_MODAL';

    case 'faucet':
      return 'FAUCET_MODAL';

    case 'affiliates-details':
      return 'AFFILIATES_DETAILS_MODAL';
    default:
      return undefined;
  }
};
