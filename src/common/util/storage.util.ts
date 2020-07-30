const tokenName = 'accessToken';
const refName = 'ref';

export const getAccessToken = () => localStorage.getItem(tokenName) ?? undefined;

export const setAccessToken = (accessToken: string) => localStorage.setItem(tokenName, accessToken);

export const clearAccessToken = () => localStorage.removeItem(tokenName);

export const saveReferral = (referralId: string) => localStorage.setItem(refName, referralId);

export const readReferral = () => localStorage.getItem(refName) ?? undefined;
