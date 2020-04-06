import { SidebarState } from './sidebar.model';
import { ModalState } from './modal.model';

export interface State {
  sidebar: SidebarState;
  modal: ModalState;
}
