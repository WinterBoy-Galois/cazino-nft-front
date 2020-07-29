import { Reducer } from 'react';
import { Action } from '../actions';
import { AuthState } from '../models/auth.model';
import { setAccessToken, clearAccessToken } from '../../common/util/storage.util';

export const authReducer: Reducer<AuthState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'AUTH_SIGN_IN':
      if (payload.accessToken && payload.remember) {
        setAccessToken(payload.accessToken);
      }

      return {
        ...state,
        user: payload.user,
        state: 'SIGNED_IN',
        accessToken: payload.accessToken ?? state.accessToken,
      };

    case 'AUTH_SIGN_OUT':
      clearAccessToken();

      return {
        state: 'UNAUTHENTICATED',
      };

    case 'AUTH_TOKEN_REFRESH': {
      setAccessToken(payload.accessToken);

      return {
        ...state,
        accessToken: payload.accessToken,
      };
    }

    case 'AUTH_SIGN_UP':
      setAccessToken(payload.accessToken);

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

    default:
      return state;
  }
};
