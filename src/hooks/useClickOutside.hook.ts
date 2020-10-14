import { useEffect, MutableRefObject } from 'react';

export function useClickOutside(
  excludeRef: MutableRefObject<any> | MutableRefObject<any>[],
  onOutsideClick: () => void
) {
  const isOutsideClick = (ref: MutableRefObject<any>, event: MouseEvent) =>
    ref.current &&
    typeof ref.current.contains === 'function' &&
    !ref.current.contains(event.target);

  const handleClickOutside = (event: MouseEvent) => {
    if (Array.isArray(excludeRef)) {
      const result = excludeRef.map(r => isOutsideClick(r, event));
      if (!result.includes(false)) {
        onOutsideClick();
      }
    } else if (isOutsideClick(excludeRef, event)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
