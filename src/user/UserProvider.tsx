import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { initialState, userReducer } from './user.reducer';
import { Action, UserState } from './user.types';

let accessToken: string | null = null;
const rtFlag = 'checkRTFlag';

export const setAccessToken = (nt: string | null) => (accessToken = nt);
export const getAccessToken = () => accessToken;

export const getCheckRTFlag = () => localStorage.getItem(rtFlag);
export const setCheckRTFlag = (value: string | null) => {
  if (!value) return localStorage.removeItem(rtFlag);
  localStorage.setItem(rtFlag, value);
};

export const UserContext = createContext<[UserState, Dispatch<Action>]>([initialState, () => null]);

export const UserProvider: React.FC = ({ children }) => {
  const mainState = useReducer(userReducer, initialState);
  return <UserContext.Provider value={mainState}>{children}</UserContext.Provider>;
};

export const useUserState = () => useContext(UserContext);
