const tokenName = 'accessToken';

export const getAccessToken = () => localStorage.getItem(tokenName);

export const setAccessToken = (accessToken: string) => localStorage.setItem(tokenName, accessToken);
