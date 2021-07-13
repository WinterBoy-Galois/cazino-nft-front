import { SidebarActionType } from './sidebar.action';
import { ModalActionType } from './modal.action';
import { AuthActionTypeNew } from './newAuth.action';
import { ReferralActionType } from './referral.action';

export interface Action {
  type: ActionType;
  payload?: any;
}

export type ActionType =
  | SidebarActionType
  | ModalActionType
  | AuthActionTypeNew
  | ReferralActionType;
