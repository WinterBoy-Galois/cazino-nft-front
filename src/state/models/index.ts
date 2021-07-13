import { SidebarState } from './sidebar.model';
import { ModalState } from './modal.model';
import { ReferralState } from './referral.model';
import { NewAuthState } from './newAuth.model';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';

export interface State {
  sidebar: SidebarState;
  modal: ModalState;
  newAuth: NewAuthState;
  referral: ReferralState;
}

const isAuthorized = useIsAuthorized();
