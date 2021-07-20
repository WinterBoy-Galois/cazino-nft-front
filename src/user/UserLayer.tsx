import React, { useEffect } from 'react';
import { useUserState } from './UserProvider';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { loginAction } from './user.actions';
import Spinner from '../components/Spinner';

import styles from './user.module.scss';

export const UserLayer: React.FC = ({ children }) => {
  const [{ accessToken }, dispatch] = useUserState();

  const [getMe, { called, data, error, loading }] = useLazyQuery(ME);

  useEffect(() => {
    console.log('should be called once', accessToken);
    if (accessToken) {
      console.log('get me');
      getMe();
    }
  }, []);

  useEffect(() => {
    if (called && !loading && !error && data) {
      dispatch(
        loginAction({
          user: data.me,
        })
      );
    }
  }, [called, data, error, loading]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  return loading ? (
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
