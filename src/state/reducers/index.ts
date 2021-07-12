import { sidebarReducer } from './sidebar.reducer';
import { Reducer } from 'react';
import { Action } from '../actions';
import { State } from '../models';
import { modalReducer } from './modal.reducer';
import { authReducer } from './auth.reducer';
import { newAuthReducer } from './newAuth.reducer';
import { referralReducer } from './referral.reducer';

export const mainReducer: Reducer<State, Action> = (
  { sidebar, modal, auth, newAuth, referral },
  action
) => {
  return {
    sidebar: sidebarReducer(sidebar, action),
    modal: modalReducer(modal, action),
    auth: authReducer(auth, action),
    newAuth: newAuthReducer(newAuth as any, action),
    referral: referralReducer(referral, action),
  };
};
