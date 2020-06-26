import { useEffect, MutableRefObject } from 'react';

export function useClickOutside(ref: MutableRefObject<any>, onOutsideClick: () => void) {
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick();
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  });
}
