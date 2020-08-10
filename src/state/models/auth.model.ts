import User from '../../models/user.model';

export interface AuthState {
  state: AuthType;
  user?: User;
  accessToken?: string;
  passwordResetToken?: string;
}

export type AuthType = 'SIGNED_IN' | 'SIGNED_OUT';
