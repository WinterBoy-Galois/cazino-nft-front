import { AuthType } from '../../state/models/auth.model';

const stateName = 'authState';

export const readAuthState = (): AuthType =>
  (localStorage.getItem(stateName) as AuthType) ?? 'SIGNED_OUT';

export const saveAuthState = (state: AuthType) => localStorage.setItem(stateName, state);

export const clearAuthState = () => localStorage.removeItem(stateName);
