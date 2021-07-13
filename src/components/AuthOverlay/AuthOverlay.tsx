import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';
import styles from './AuthOverlay.module.scss';
import Spinner from '../Spinner';
import { loginAction, loginWithModalAction } from '../../state/actions/newAuth.action';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';

const AuthOverlay: React.FC = ({ children }) => {
  const isAuthorized = useIsAuthorized();
  const [
    {
      newAuth: { user },
    },
    dispatch,
  ] = useStateValue();
  const { data, error } = useQuery(ME, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (error && isAuthorized) {
      dispatch(loginWithModalAction());
    } else if (!error && data && isAuthorized && !user) {
      dispatch(loginAction({ user: data.me }));
    }
  }, [dispatch, data, error, isAuthorized, user]);

  return isAuthorized && !user ? (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <Spinner color={'WHITE'} />
      </div>
      <div>Just a moment</div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default AuthOverlay;
