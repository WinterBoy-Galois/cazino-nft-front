export type UserActionType =
  | 'User/LOGIN'
  | 'User/REGISTER'
  | 'User/LOGOUT'
  | 'User/UPDATE_USER'
  | 'User/UPDATE_REFRESH_TOKEN'
  | 'User/TOGGLE_RELOGIN'
  | 'User/RESET_PASSWORD'
  | 'User/LOGOUT_WITH_MODAL';

export const LOGIN: UserActionType = 'User/LOGIN';
export const REGISTER: UserActionType = 'User/REGISTER';
export const LOGOUT: UserActionType = 'User/LOGOUT';
export const LOGOUT_WITH_MODAL: UserActionType = 'User/LOGOUT_WITH_MODAL';
export const UPDATE_USER: UserActionType = 'User/UPDATE_USER';
export const UPDATE_REFRESH_TOKEN: UserActionType = 'User/UPDATE_REFRESH_TOKEN';
export const RESET_PASSWORD: UserActionType = 'User/RESET_PASSWORD';
export const TOGGLE_RELOGIN: UserActionType = 'User/TOGGLE_RELOGIN';

export const loginAction = (payload?: any) => ({ type: LOGIN, payload });
export const registerAction = (payload?: any) => ({ type: REGISTER, payload });
export const logoutAction = (payload?: any) => ({ type: LOGOUT, payload });
export const logoutWithModalAction = (payload?: any) => ({ type: LOGOUT_WITH_MODAL, payload });
export const updateUserAction = (payload?: any) => ({ type: UPDATE_USER, payload });
export const updateRefreshTokenAction = (payload?: string) => ({
  type: UPDATE_REFRESH_TOKEN,
  payload,
});
export const resetPasswordAction = (payload?: any) => ({ type: RESET_PASSWORD, payload });
export const toggleShowModalAction = (payload?: any) => ({ type: TOGGLE_RELOGIN, payload });
