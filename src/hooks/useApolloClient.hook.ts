import { useStateValue } from '../state';
import { useMemo } from 'react';
import getApolloClient from '../graphql/client';

export function useApolloClient() {
  const [
    {
      auth: { accessToken },
    },
    dispatch,
  ] = useStateValue();

  const client = useMemo(
    () =>
      getApolloClient(
        t => dispatch({ type: 'AUTH_TOKEN_REFRESH', payload: { accessToken: t } }),
        accessToken
      ),
    [dispatch, accessToken]
  );

  return client;
}
