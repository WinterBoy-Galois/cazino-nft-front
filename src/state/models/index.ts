import { SidebarState } from './sidebar.model';
import { ModalState } from './modal.model';
import { AuthState } from './auth.model';
import { ReferralState } from './referral.model';
import { NewAuthState } from '../reducers/newAuth.reducer';

export interface State {
  sidebar: SidebarState;
  modal: ModalState;
  auth: AuthState;
  newAuth: NewAuthState;
  referral: ReferralState;
}
