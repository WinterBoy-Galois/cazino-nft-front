import useSound from 'use-sound';
import { useStateValue } from '../state';
import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noon = () => {};

export const useOptionalSound = (src: string) => {
  const [play] = useSound(src);
  const [state] = useStateValue();
  const isSound = useMemo(() => state?.sidebar?.isSound, [state?.sidebar?.isSound]);

  return isSound ? play : noon;
};
