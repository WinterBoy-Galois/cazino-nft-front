const refName = 'ref';

export const saveReferral = (referralId: string) => localStorage.setItem(refName, referralId);
export const readReferral = () => localStorage.getItem(refName) ?? undefined;
