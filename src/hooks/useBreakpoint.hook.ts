import { useWindowDimensions } from './useWindowDimensions.hook';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const breakpoints: { name: Breakpoint; minWidth: number }[] = [
  {
    name: 'xs',
    minWidth: 0,
  },
  {
    name: 'sm',
    minWidth: 576,
  },
  {
    name: 'md',
    minWidth: 768,
  },
  {
    name: 'lg',
    minWidth: 992,
  },
  {
    name: 'xl',
    minWidth: 1200,
  },
];

export const useBreakpoint = (): Breakpoint => {
  const { width } = useWindowDimensions();

  for (let i = 0; i < breakpoints.length; i++) {
    if (width >= breakpoints[i].minWidth) {
      if (!breakpoints[i + 1] || width < breakpoints[i + 1].minWidth) {
        return breakpoints[i].name;
      }
    }
  }

  throw Error('Could not identify breakpoint.');
};
