import React, { useEffect, Fragment } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';
import styles from './AuthOverlay.module.scss';
import Spinner from '../Spinner';
import { useEffectOnce } from '../../hooks/useEffectOnce.hook';

const AuthOverlay: React.FC = ({ children }) => {
  const [{ auth }, dispatch] = useStateValue();
  const [me, { data, error }] = useLazyQuery(ME, { fetchPolicy: 'network-only' });

  useEffectOnce(() => {
    if (auth.state === 'SIGNED_IN') {
      me();
    }
  });

  useEffect(() => {
    if (error) {
      dispatch({ type: 'AUTH_SIGN_OUT' });
    } else if (!error && data) {
      dispatch({
        type: 'AUTH_SIGN_IN',
        payload: { user: { ...data.me } },
      });
    }
  }, [dispatch, data, error]);

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
