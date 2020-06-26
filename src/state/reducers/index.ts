import { sidebarReducer } from './sidebar.reducer';
import { Reducer } from 'react';
import { Action } from '../actions';
import { State } from '../models';
import { modalReducer } from './modal.reducer';

export const mainReducer: Reducer<State, Action> = ({ sidebar, modal }, action) => {
  return {
    sidebar: sidebarReducer(sidebar, action),
    modal: modalReducer(modal, action),
  };
};
