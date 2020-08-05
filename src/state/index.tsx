import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { State } from './models';
import { mainReducer } from './reducers';
import { Action } from './actions';
import { useBreakpoint, Breakpoint } from '../hooks/useBreakpoint.hook';
import { readAuthState, readReferral } from '../common/util/storage.util';

const getInitialState = (isSidebarOpen: boolean): State => ({
  sidebar: {
    isOpen: isSidebarOpen,
    selectedTab: 'LATEST_BETS',
    selectedLeaderboardAggregation: 'DAILY',
  },
  modal: {
    type: 'NONE',
  },
  auth: { state: readAuthState() },
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
  getInitialState(false),
  () => null,
]);

interface IProps {
  state?: State;
}

export const StateProvider: React.FC<IProps> = ({ children, state }) => {
  const breakpoint = useBreakpoint();
  const initialState = state ?? getInitialState(isSidebarInitiallyOpen(breakpoint));

  return (
    <StateContext.Provider value={useReducer(mainReducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
