const tokenName = 'accessToken';

export const getAccessToken = () => localStorage.getItem(tokenName) ?? undefined;

export const setAccessToken = (accessToken: string) => localStorage.setItem(tokenName, accessToken);
