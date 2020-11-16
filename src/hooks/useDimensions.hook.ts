import { RefObject, useEffect, useRef, useState } from 'react';

function getDimensions(ref: RefObject<any>) {
  return {
    width: ref.current?.clientWidth,
    height: ref.current?.clientHeight,
  };
}

export const useDimensions = () => {
  const ref = useRef<any>(null);
  const [dimensions, setDimensions] = useState(getDimensions(ref));

  const handleResize = () => {
    setDimensions(getDimensions(ref));
  };

  useEffect(() => {
    if (ref.current) {
      handleResize();
    }
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ref, dimensions };
};
