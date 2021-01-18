export interface ModalState {
  type: ModalType;
  data?: any;
  isReplace?: boolean;
}

export type ModalType =
  | 'NONE'
  | 'USER_INFO_MODAL'
  | 'BET_DETAILS_MODAL'
  | 'CHANGE_SERVER_SEED_CONFIRMATION'
  | 'ACCOUNT_ACTIVATION_MODAL'
  | 'SIGN_IN_MODAL'
  | 'SIGN_UP_MODAL'
  | 'PASSWORD_RESET_MODAL'
  | 'PASSWORD_RECOVERY_MODAL'
  | 'CASHIER_MODAL'
  | 'DEPOSIT_DETAILS_MODAL'
  | 'PROFIT_CUT_MODAL';
