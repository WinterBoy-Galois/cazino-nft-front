import { useEffect } from 'react';

export function useScrollLock(lock: boolean, lockTouch: boolean = true) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    }

    if (lockTouch) {
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
  }, [lock, lockTouch]);
}
