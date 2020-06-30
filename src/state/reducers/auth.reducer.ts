import { Reducer } from 'react';
import { Action } from '../actions';
import { AuthState } from '../models/auth.model';

export const authReducer: Reducer<AuthState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'SIGN_IN':
      return {
        ...state,
        ...{ user: payload.data.user, accessToken: payload.data.accessToken },
        state: 'SIGNED_IN',
      };

    case 'SIGN_OUT':
      return {
        state: 'UNAUTHENTICATED',
      };

    default:
      return state;
  }
};
