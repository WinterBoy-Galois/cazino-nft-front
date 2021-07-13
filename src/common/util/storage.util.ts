import { AuthType } from '../../state/models/newAuth.model';

const refName = 'ref';
const stateName = 'authState';

export const readAuthState = (): AuthType =>
  (localStorage.getItem(stateName) as AuthType) ?? 'SIGNED_OUT';
export const saveAuthState = (state: AuthType) => localStorage.setItem(stateName, state);
export const clearAuthState = () => localStorage.removeItem(stateName);

export const saveReferral = (referralId: string) => localStorage.setItem(refName, referralId);
export const readReferral = () => localStorage.getItem(refName) ?? undefined;
