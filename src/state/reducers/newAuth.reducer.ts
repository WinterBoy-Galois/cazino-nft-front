import { Reducer } from 'react';
import { Action } from '../actions';
import {
  LOGIN,
  LOGOUT,
  LOGIN_WITH_MODAL,
  REGISTER,
  RESET_PASSWORD,
  UPDATE_REFRESH_TOKEN,
  UPDATE_USER,
  TOGGLE_RELOGIN,
} from '../actions/newAuth.action';
import { NewAuthState } from '../models/newAuth.model';

const logoutAction = (state: NewAuthState): NewAuthState => ({
  ...state,
  state: 'SIGNED_OUT',
  accessToken: undefined,
  user: undefined,
});

export const newAuthReducer: Reducer<NewAuthState, Action> = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        state: 'SIGNED_IN',
        relogin: false,
        accessToken: action.payload.accessToken ?? state.accessToken,
      };
    case REGISTER:
      return {
        ...state,
        ...action.payload,
        state: 'SIGNED_IN',
      };
    case LOGOUT:
      return logoutAction(state);
    case LOGIN_WITH_MODAL:
      return {
        ...logoutAction(state),
        relogin: true,
      };
    case UPDATE_REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        passwordResetToken: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case TOGGLE_RELOGIN:
      return {
        ...state,
        relogin: action.payload,
      };
    default:
      return state;
  }
};
