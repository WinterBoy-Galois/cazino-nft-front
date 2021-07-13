export type AuthActionTypeNew =
  | 'auth/LOGIN'
  | 'auth/REGISTER'
  | 'auth/LOGOUT'
  | 'auth/LOGOUT_WITH_MODAL'
  | 'auth/RESET_PASSWORD'
  | 'auth/UPDATE_USER'
  | 'auth/TOGGLE_RELOGIN'
  | 'auth/UPDATE_REFRESH_TOKEN';

export const LOGIN: AuthActionTypeNew = 'auth/LOGIN';
export const REGISTER: AuthActionTypeNew = 'auth/REGISTER';
export const LOGOUT: AuthActionTypeNew = 'auth/LOGOUT';
export const LOGIN_WITH_MODAL: AuthActionTypeNew = 'auth/LOGOUT_WITH_MODAL';
export const UPDATE_REFRESH_TOKEN: AuthActionTypeNew = 'auth/UPDATE_REFRESH_TOKEN';
export const RESET_PASSWORD: AuthActionTypeNew = 'auth/RESET_PASSWORD';
export const UPDATE_USER: AuthActionTypeNew = 'auth/UPDATE_USER';
export const TOGGLE_RELOGIN: AuthActionTypeNew = 'auth/TOGGLE_RELOGIN';

export const loginAction = (payload?: any) => ({ type: LOGIN, payload });
export const registerAction = (payload?: any) => ({ type: REGISTER, payload });
export const logoutAction = (payload?: any) => ({ type: LOGOUT, payload });
export const loginWithModalAction = (payload?: any) => ({ type: LOGIN_WITH_MODAL, payload });
export const updateRefreshTokenAction = (payload?: any) => ({
  type: UPDATE_REFRESH_TOKEN,
  payload,
});
export const resetPasswordAction = (payload?: any) => ({ type: RESET_PASSWORD, payload });
export const updateUserAction = (payload?: any) => ({ type: UPDATE_USER, payload });
export const toggleReloginAction = (payload?: any) => ({ type: TOGGLE_RELOGIN, payload });
