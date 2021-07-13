import { useStateValue } from '../state';

export const useIsAuthorized = () => {
  const [{ newAuth }] = useStateValue();

  return newAuth.state === 'SIGNED_IN';
};
