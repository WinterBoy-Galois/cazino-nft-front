import { Reducer } from 'react';
import {
  LOGIN,
  LOGOUT,
  LOGOUT_WITH_MODAL,
  REGISTER,
  UPDATE_USER,
  RESET_PASSWORD,
  TOGGLE_RELOGIN,
  UPDATE_REFRESH_TOKEN,
} from './user.actions';
import { UserState, Action } from './user.types';

export const initialState: UserState = {
  showLoginModal: false,
  accessToken: localStorage.getItem('accessToken'),
  user: undefined,
  passwordResetToken: null,
};

const logoutAction = (state: UserState): UserState => ({
  ...state,
  accessToken: null,
  user: undefined,
  showLoginModal: false,
});

export const userReducer: Reducer<UserState, Action> = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        showLoginModal: false,
      };
    case REGISTER:
      return {
        ...state,
        ...action.payload,
        state: 'SIGNED_IN',
      };
    case LOGOUT:
      return logoutAction(state);
    case LOGOUT_WITH_MODAL:
      return {
        ...logoutAction(state),
        showLoginModal: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              ...action.payload,
            }
          : undefined,
      };
    case TOGGLE_RELOGIN:
      return {
        ...state,
        showLoginModal: action.payload,
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
  }
};
