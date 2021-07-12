import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';
import styles from './AuthOverlay.module.scss';
import Spinner from '../Spinner';
import { LoginAction, LogoutWithModalAction } from '../../state/actions/newAuth.action';

const AuthOverlay: React.FC = ({ children }) => {
  const [{ newAuth }, dispatch] = useStateValue();
  const { data, error } = useQuery(ME, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (error && newAuth.state === 'SIGNED_IN') {
      dispatch({ type: LogoutWithModalAction });
    } else if (!error && data && newAuth.state === 'SIGNED_IN' && !newAuth.user) {
      dispatch({
        type: LoginAction,
        payload: { user: { ...data.me } },
      });
    }
  }, [dispatch, data, error, newAuth.state, newAuth.user]);

  return newAuth.state === 'SIGNED_IN' && !newAuth.user ? (
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
