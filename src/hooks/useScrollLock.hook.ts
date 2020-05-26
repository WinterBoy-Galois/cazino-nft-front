import { useEffect } from 'react';
import { useScrollbarWidth } from './useScrollbarWidth.hook';

export function useScrollLock(lock: boolean, lockTouch = true) {
  const scrollbarWidth = useScrollbarWidth();

  useEffect(() => {
    if (lock) {
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.overflow = 'hidden';
    }

    if (lockTouch) {
      document.ontouchmove = e => {
        e.preventDefault();
      };
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      document.ontouchmove = null;
    };
  }, [lock, lockTouch, scrollbarWidth]);
}
