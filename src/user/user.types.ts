import User from '../models/user.model';
import { UserActionType } from './user.actions';

export interface UserState {
  showLoginModal: boolean;
  accessToken: string | null;
  passwordResetToken: string | null;
  user?: User;
}

export type Action = { type: UserActionType; payload: any };
