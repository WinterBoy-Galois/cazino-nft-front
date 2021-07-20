import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { initialState, userReducer } from './user.reducer';
import { Action, UserState } from './user.types';

export const UserContext = createContext<[UserState, Dispatch<Action>]>([initialState, () => null]);

export const UserProvider: React.FC = ({ children }) => {
  const mainState = useReducer(userReducer, initialState);
  console.log(mainState[0]);
  return <UserContext.Provider value={mainState}>{children}</UserContext.Provider>;
};

export const useUserState = () => useContext(UserContext);
