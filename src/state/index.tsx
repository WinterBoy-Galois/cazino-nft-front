import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { State } from './models';
import { mainReducer } from './reducers';
import { Action } from './actions';
import { useBreakpoint, Breakpoint } from '../hooks/useBreakpoint.hook';
import { readReferral } from '../common/util/storage.util';

const getInitialState = (
  isSidebarOpen: boolean,
  isSoundOpen: boolean,
  isChatBotOpen: boolean
): State => ({
  sidebar: {
    isChatBot: isChatBotOpen,
    isSound: isSoundOpen,
    isOpen: isSidebarOpen,
    selectedTab: 'LATEST_BETS',
    selectedLeaderboardAggregation: 'DAILY',
  },
  modal: {
    type: 'NONE',
  },
  referral: {
    id: readReferral(),
  },
});

const isSidebarInitiallyOpen = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
      return false;

    default:
      return true;
  }
};

export const StateContext = createContext<[State, Dispatch<Action>]>([
  getInitialState(false, true, true),
  () => null,
]);

interface IProps {
  state?: State;
}

export const StateProvider: React.FC<IProps> = ({ children, state }) => {
  const breakpoint = useBreakpoint();
  const initialState = state ?? getInitialState(isSidebarInitiallyOpen(breakpoint), true, true);
  const mainState = useReducer(mainReducer, initialState);

  return <StateContext.Provider value={mainState}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
