import React, { useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';
import styles from './AuthOverlay.module.scss';
import Spinner from '../Spinner';

const AuthOverlay: React.FC = ({ children }) => {
  const [{ auth }, dispatch] = useStateValue();
  const { data, error } = useQuery(ME, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (error && auth.state === 'SIGNED_IN') {
      dispatch({ type: 'AUTH_SIGN_OUT' });
    } else if (!error && data && auth.state === 'SIGNED_IN' && !auth.user) {
      dispatch({
        type: 'AUTH_SIGN_IN',
        payload: { user: { ...data.me } },
      });
    }
  }, [dispatch, data, error, auth.state, auth.user]);

  return auth.state === 'SIGNED_IN' && !auth.user ? (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <Spinner color={'WHITE'} />
      </div>
      <div>Just a moment</div>
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default AuthOverlay;
