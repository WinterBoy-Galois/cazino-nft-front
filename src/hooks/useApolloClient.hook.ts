import { useStateValue } from '../state';
import { useMemo } from 'react';
import getApolloClient from '../graphql/client';
import { loginWithModalAction, updateRefreshTokenAction } from '../state/actions/newAuth.action';
import { useIsAuthorized } from './useIsAuthorized';

export function useApolloClient() {
  const isAuthorized = useIsAuthorized();
  const [
    {
      newAuth: { accessToken },
    },
    dispatch,
  ] = useStateValue();

  return useMemo(
    () =>
      getApolloClient(
        t => dispatch(updateRefreshTokenAction({ accessToken: t })),
        () => dispatch(loginWithModalAction()),
        isAuthorized,
        accessToken
      ),
    [dispatch, accessToken, isAuthorized]
  );
}
