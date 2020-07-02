import { SidebarState } from './sidebar.model';
import { ModalState } from './modal.model';
import { AuthState } from './auth.model';

export interface State {
  sidebar: SidebarState;
  modal: ModalState;
  auth: AuthState;
}
