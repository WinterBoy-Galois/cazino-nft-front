import React, { useEffect } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams.hook';
import { Redirect, useLocation } from '@reach/router';
import { useStateValue } from '../../state';

const Referrals: React.FC = () => {
  const [, dispatch] = useStateValue();
  const location = useLocation();
  const params = useQueryParams();

  useEffect(() => {
    if (params.ref) {
      dispatch({ type: 'REFERRAL_ADD', payload: params.ref });
    }
  }, [dispatch, params.ref]);

  if (params.ref) {
    return <Redirect noThrow to={location.pathname} />;
  }

  return null;
};

export default Referrals;
