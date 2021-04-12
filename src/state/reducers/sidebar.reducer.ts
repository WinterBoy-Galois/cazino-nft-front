import { SidebarState } from '../models/sidebar.model';
import { Reducer } from 'react';
import { Action } from '../actions';

export const sidebarReducer: Reducer<SidebarState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'SIDEBAR_TOGGLE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'SIDEBAR_SELECT_TAB':
      return {
        ...state,
        selectedTab: payload,
      };

    case 'SOUND_ON_OFF':
      return {
        ...state,
        isSound: !state.isSound,
      };
    case 'CHAT_BOT_SHOW':
      return {
        ...state,
        isChatBot: payload,
      };
    default:
      return state;
  }
};
