import { useEffect } from 'react';

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
      document.ontouchmove = e => {
        e.preventDefault();
      };
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.ontouchmove = () => {
        return true;
      };
    };
  }, [lock]);
}
