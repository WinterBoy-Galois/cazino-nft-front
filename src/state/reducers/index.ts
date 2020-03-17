import { sidebarReducer } from './sidebar.reducer';
import { Reducer } from 'react';
import { Action } from '../actions';
import { State } from '../models';

export const mainReducer: Reducer<State, Action> = ({ sidebar }, action) => ({
  sidebar: sidebarReducer(sidebar, action),
});
