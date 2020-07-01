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
      dispatch({ type: 'SIGN_IN', payload: { data: { user: { ...data.me } } } });
    }

    if (error || !getAccessToken()) {
      dispatch({ type: 'SIGN_OUT' });
    }
  }, [dispatch, data, error]);

  return auth.state === 'UNKNOWN' ? <div>Just a moment</div> : <Fragment>{children}</Fragment>;
};

export default AuthOverlay;
