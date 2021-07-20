import { useEffect, useState } from 'react';
import { useUserState } from '../user/UserProvider';

interface Props<T> {
  loading: boolean;
  action: (args: T) => void;
}

export const usePendingBetHook = <T extends any>({ loading, action }: Props<T>) => {
  const [{ accessToken }] = useUserState();
  const [pendingBet, setPendingBet] = useState<T | null>();

  useEffect(() => {
    if (accessToken && pendingBet && !loading) {
      action(pendingBet);
    }
  }, [accessToken]);

  return [setPendingBet];
};
