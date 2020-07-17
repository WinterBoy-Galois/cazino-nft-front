import { sidebarReducer } from './sidebar.reducer';
import { Reducer } from 'react';
import { Action } from '../actions';
import { State } from '../models';
import { modalReducer } from './modal.reducer';
import { authReducer } from './auth.reducer';

export const mainReducer: Reducer<State, Action> = ({ sidebar, modal, auth }, action) => {
  return {
    sidebar: sidebarReducer(sidebar, action),
    modal: modalReducer(modal, action),
    auth: authReducer(auth, action),
  };
};
