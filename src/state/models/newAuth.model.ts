import User from '../../models/user.model';

export type AuthType = 'SIGNED_IN' | 'SIGNED_OUT';

export interface NewAuthState {
  state: AuthType;
  user?: User;
  accessToken?: string;
  passwordResetToken?: string;
  relogin: boolean;
}
