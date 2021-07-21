import React, { useEffect, useState } from 'react';
import { getCheckRTFlag, setAccessToken, setCheckRTFlag, useUserState } from './UserProvider';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { loginAction } from './user.actions';
import Spinner from '../components/Spinner';

import styles from './user.module.scss';
import { getNewToken } from '../graphql/newClient';

export const UserLayer: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [{ accessToken }, dispatch] = useUserState();
  const checkRt = getCheckRTFlag();

  const [getMe, { called, data, error, loading: getMeLoading }] = useLazyQuery(ME);

  const loading = isLoading || getMeLoading;

  const blahFunc = async () => {
    try {
      const { accessToken } = await getNewToken();
      await setAccessToken(accessToken);
      getMe();
    } catch (error) {
      setCheckRTFlag(null);
    } finally {
      await setIsLoading(false);
    }
  };

  useEffect(() => {
    if (checkRt) {
      blahFunc();
    } else {
      setIsLoading(false);
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
      setAccessToken(accessToken);
    } else {
      setAccessToken(null);
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
