import User from '../../models/user.model';

export interface AuthState {
  state: 'UNKNOWN' | 'SIGNED_IN' | 'UNAUTHENTICATED';
  user?: User;
  accessToken?: string;
}
