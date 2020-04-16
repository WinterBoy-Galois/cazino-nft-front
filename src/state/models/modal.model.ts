export interface ModalState {
  type: ModalType;
  data?: any;
}

export type ModalType = 'NONE' | 'USER_INFO_MODAL';
