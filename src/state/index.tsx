import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { State } from './models';
import { mainReducer } from './reducers';
import { Action } from './actions';

const initialState: State = {
  sidebar: {
    isOpen: false,
  },
};

export const StateContext = createContext<[State, Dispatch<Action>]>([initialState, () => null]);

export const StateProvider: React.SFC = ({ children }) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
