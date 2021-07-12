import { Reducer } from 'react';
import { Action } from '../actions';
import User from '../../models/user.model';
import { AuthType } from '../models/auth.model';
import {
  LoginAction,
  LogoutAction,
  LogoutWithModalAction,
  RegisterAction,
  ResetPasswordAction,
  UpdateRefreshTokenAction,
  UpdateUserAction,
  ToggleReLoginAction,
} from '../actions/newAuth.action';

export interface NewAuthState {
  state: AuthType;
  user?: User;
  accessToken?: string;
  passwordResetToken?: string;
  relogin: boolean;
}

const logoutAction = (state: NewAuthState): NewAuthState => ({
  ...state,
  state: 'SIGNED_OUT',
  accessToken: undefined,
  user: undefined,
});

export const newAuthReducer: Reducer<NewAuthState, Action> = (state, action) => {
  switch (action.type) {
    case LoginAction:
      return {
        ...state,
        user: action.payload.user,
        state: 'SIGNED_IN',
        relogin: false,
        accessToken: action.payload.accessToken ?? state.accessToken,
      };
    case RegisterAction:
      return {
        ...state,
        ...action.payload,
        state: 'SIGNED_IN',
      };
    case LogoutAction:
      return logoutAction(state);
    case LogoutWithModalAction:
      return {
        ...logoutAction(state),
        relogin: true,
      };
    case UpdateRefreshTokenAction:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case ResetPasswordAction:
      return {
        ...state,
        passwordResetToken: action.payload,
      };
    case UpdateUserAction:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case ToggleReLoginAction:
      return {
        ...state,
        relogin: action.payload,
      };
    default:
      return state;
  }
};
