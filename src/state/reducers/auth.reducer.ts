import { Reducer } from 'react';
import { Action } from '../actions';
import { AuthState } from '../models/auth.model';
import { saveAuthState } from '../../common/util/storage.util';

export const authReducer: Reducer<AuthState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'AUTH_SIGN_IN':
      saveAuthState('SIGNED_IN');

      return {
        ...state,
        user: payload.user,
        state: 'SIGNED_IN',
        accessToken: payload.accessToken ?? state.accessToken,
      };

    case 'AUTH_SIGN_OUT':
      saveAuthState('SIGNED_OUT');

      return {
        ...state,
        state: 'SIGNED_OUT',
        accessToken: undefined,
        user: undefined,
      };

    case 'AUTH_TOKEN_REFRESH': {
      return {
        ...state,
        accessToken: payload.accessToken,
      };
    }

    case 'AUTH_SIGN_UP':
      saveAuthState('SIGNED_IN');

      return {
        ...state,
        ...payload,
        state: 'SIGNED_IN',
      };

    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };

    case 'AUTH_ADD_PASSWORD_RESET_TOKEN':
      return {
        ...state,
        passwordResetToken: payload,
      };

    default:
      return state;
  }
};
