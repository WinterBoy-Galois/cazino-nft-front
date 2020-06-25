export interface ModalState {
  type: ModalType;
  data?: any;
}

export type ModalType =
  | 'NONE'
  | 'USER_INFO_MODAL'
  | 'BET_DETAILS_MODAL'
  | 'CHANGE_SERVER_SEED_CONFIRMATION';
