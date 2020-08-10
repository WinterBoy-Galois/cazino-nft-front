import { SidebarState } from './sidebar.model';
import { ModalState } from './modal.model';
import { AuthState } from './auth.model';
import { ReferralState } from './referral.model';

export interface State {
  sidebar: SidebarState;
  modal: ModalState;
  auth: AuthState;
  referral: ReferralState;
}
