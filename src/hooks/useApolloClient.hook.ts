import { useStateValue } from '../state';
import { useMemo } from 'react';
import getApolloClient from '../graphql/client';
import { loginWithModalAction, updateRefreshTokenAction } from '../state/actions/newAuth.action';

export function useApolloClient() {
  const [
    {
      newAuth: { accessToken, state },
    },
    dispatch,
  ] = useStateValue();

  return useMemo(
    () =>
      getApolloClient(
        t => dispatch(updateRefreshTokenAction({ accessToken: t })),
        () => dispatch(loginWithModalAction()),
        state,
        accessToken
      ),
    [dispatch, accessToken, state]
  );
}
