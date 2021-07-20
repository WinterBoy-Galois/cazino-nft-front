import { useUserState } from '../user/UserProvider';

export const useIsAuthorized = () => {
  const [{ user }] = useUserState();

  return !!user;
};
