import { SidebarState } from '../models/sidebar.model';
import { Reducer } from 'react';
import { Action } from '../actions';

export const sidebarReducer: Reducer<SidebarState, Action> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
};
