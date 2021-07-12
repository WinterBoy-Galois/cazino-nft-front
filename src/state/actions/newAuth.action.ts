export type AuthActionTypeNew =
  | 'auth/LOGIN'
  | 'auth/REGISTER'
  | 'auth/LOGOUT'
  | 'auth/LOGOUT_WITH_MODAL'
  | 'auth/RESET_PASSWORD'
  | 'auth/UPDATE_USER'
  | 'auth/TOGGLE_RELOGIN'
  | 'auth/UPDATE_REFRESH_TOKEN';

export const LoginAction: AuthActionTypeNew = 'auth/LOGIN';
export const RegisterAction: AuthActionTypeNew = 'auth/REGISTER';
export const LogoutAction: AuthActionTypeNew = 'auth/LOGOUT';
export const LogoutWithModalAction: AuthActionTypeNew = 'auth/LOGOUT_WITH_MODAL';
export const UpdateRefreshTokenAction: AuthActionTypeNew = 'auth/UPDATE_REFRESH_TOKEN';
export const ResetPasswordAction: AuthActionTypeNew = 'auth/RESET_PASSWORD';
export const UpdateUserAction: AuthActionTypeNew = 'auth/UPDATE_USER';
export const ToggleReLoginAction: AuthActionTypeNew = 'auth/TOGGLE_RELOGIN';
