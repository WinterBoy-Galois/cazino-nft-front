import { SidebarState } from './sidebar.model';
import { ModalState } from './modal.model';
import { ReferralState } from './referral.model';

export interface State {
  sidebar: SidebarState;
  modal: ModalState;
  referral: ReferralState;
}
