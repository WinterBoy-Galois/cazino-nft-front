import { ModalType } from '../../../../../state/models/modal.model';

export const mapQueryParamToModal = (param: string): ModalType | undefined => {
  switch (param) {
    case 'sign-in':
      return 'SIGN_IN_MODAL';

    case 'sign-up':
      return 'SIGN_UP_MODAL';

    case 'activation':
      return 'ACCOUNT_ACTIVATION_MODAL';

    case 'password-recovery':
      return 'PASSWORD_RESET_MODAL';

    case 'bet-details':
      return 'BET_DETAILS_MODAL';

    default:
      return undefined;
  }
};
