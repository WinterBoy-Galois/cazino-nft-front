import { SidebarState } from '../models/sidebar.model';
import { Reducer } from 'react';
import { Action } from '../actions';

export const sidebarReducer: Reducer<SidebarState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'SELECT_SIDEBAR_TAB':
      return {
        ...state,
        selectedTab: payload,
      };

    default:
      return state;
  }
};
