import { useStateValue } from '../state';
import { useMemo } from 'react';
import getApolloClient from '../graphql/client';
import { LOGIN_WITH_MODAL, UPDATE_REFRESH_TOKEN } from '../state/actions/newAuth.action';

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
        t => dispatch({ type: UPDATE_REFRESH_TOKEN, payload: { accessToken: t } }),
        () => dispatch({ type: LOGIN_WITH_MODAL }),
        state,
        accessToken
      ),
    [dispatch, accessToken, state]
  );
}
