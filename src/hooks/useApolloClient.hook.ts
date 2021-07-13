import { useStateValue } from '../state';
import { useMemo } from 'react';
import getApolloClient from '../graphql/client';
import { navigate } from '@reach/router';

export function useApolloClient() {
  const [
    {
      auth: { accessToken, state },
    },
    dispatch,
  ] = useStateValue();

  const client = useMemo(
    () =>
      getApolloClient(
        t => dispatch({ type: 'AUTH_TOKEN_REFRESH', payload: { accessToken: t } }),
        () => {
          dispatch({ type: 'AUTH_SIGN_OUT' });
          navigate('/');
        },
        state,
        accessToken
      ),
    [dispatch, accessToken, state]
  );

  return client;
}
