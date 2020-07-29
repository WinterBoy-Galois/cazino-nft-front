import { useLocation } from '@reach/router';
import * as queryString from 'query-string';
import { useMemo } from 'react';

export function useQueryParams(): any {
  const location = useLocation();
  const queryParams = useMemo(() => queryString.parse(location.search), [location]);

  return queryParams;
}
