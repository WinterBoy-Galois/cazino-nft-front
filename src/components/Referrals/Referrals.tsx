import React, { useEffect } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams.hook';
import { useLocation, useNavigate } from '@reach/router';
import { useStateValue } from '../../state';

const Referrals: React.FC = () => {
  const [, dispatch] = useStateValue();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useQueryParams();

  useEffect(() => {
    if (params.ref) {
      dispatch({ type: 'REFERRAL_ADD', payload: params.ref });
    }
  }, [dispatch, params.ref]);

  if (params.ref) {
    navigate(location.pathname);
    return null;
  }

  return null;
};

export default Referrals;
