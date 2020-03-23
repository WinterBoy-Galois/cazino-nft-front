import { SidebarActionType } from './sidebar.action';

export interface Action {
  type: ActionType;
  payload?: any;
}

export type ActionType = SidebarActionType;
