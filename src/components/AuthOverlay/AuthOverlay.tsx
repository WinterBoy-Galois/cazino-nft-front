import React, { useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';
import { getAccessToken } from '../../common/util/storage.util';

const AuthOverlay: React.FC = ({ children }) => {
  const [{ auth }, dispatch] = useStateValue();
  const { data, error } = useQuery(ME);

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'AUTH_SIGN_IN',
        payload: { user: { ...data.me }, accessToken: auth.accessToken },
      });
    }

    if (error || !getAccessToken()) {
      dispatch({ type: 'AUTH_SIGN_OUT' });
    }
  }, [dispatch, data, error, auth.accessToken]);

  return auth.state === 'UNKNOWN' ? <div>Just a moment</div> : <Fragment>{children}</Fragment>;
};

export default AuthOverlay;
