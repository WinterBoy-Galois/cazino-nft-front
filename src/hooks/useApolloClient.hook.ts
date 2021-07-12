import { useStateValue } from '../state';
import { useMemo } from 'react';
import getApolloClient from '../graphql/client';
import { LogoutWithModalAction, UpdateRefreshTokenAction } from '../state/actions/newAuth.action';

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
        t => dispatch({ type: UpdateRefreshTokenAction, payload: { accessToken: t } }),
        () => dispatch({ type: LogoutWithModalAction }),
        state,
        accessToken
      ),
    [dispatch, accessToken, state]
  );
}
