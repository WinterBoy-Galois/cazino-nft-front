import { useEffect, useRef } from 'react';
import { useLocation } from '@reach/router';

export default function useRefetchOnPageEnter(
  refetch: (variables?: any) => void,
  loading: boolean
) {
  const location = useLocation();
  const loadingRef = useRef<boolean>();

  useEffect(() => {
    loadingRef.current = loading;
  });

  useEffect(() => {
    if (!loadingRef.current) {
      refetch();
    }
  }, [location, refetch, loadingRef]);
}
