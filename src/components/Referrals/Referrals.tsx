import React, { useEffect } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams.hook';
import { saveReferral } from '../../common/util/storage.util';
import { Redirect, useLocation } from '@reach/router';

const Referrals: React.FC = () => {
  const location = useLocation();
  const params = useQueryParams();

  useEffect(() => {
    if (params.ref) {
      saveReferral(params.ref);
    }
  }, [params.ref]);

  if (params.ref) {
    return <Redirect noThrow to={location.pathname} />;
  }

  return null;
};

export default Referrals;
