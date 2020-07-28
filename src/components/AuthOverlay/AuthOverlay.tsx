import React, { useEffect, Fragment } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';
import styles from './AuthOverlay.module.scss';
import Spinner from '../Spinner';

const AuthOverlay: React.FC = ({ children }) => {
  const [{ auth }, dispatch] = useStateValue();
  const [me, { data, error }] = useLazyQuery(ME, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (auth.state !== 'UNAUTHENTICATED' && auth.accessToken) {
      me();
    }
  }, [me, auth.accessToken, auth.state]);

  useEffect(() => {
    if (!auth.accessToken || error) {
      return dispatch({ type: 'AUTH_SIGN_OUT' });
    } else if (!error && data) {
      dispatch({
        type: 'AUTH_SIGN_IN',
        payload: { user: { ...data.me } },
      });
    }
  }, [dispatch, data, error, auth.state, auth.accessToken, me]);

  return auth.state === 'UNKNOWN' ? (
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
