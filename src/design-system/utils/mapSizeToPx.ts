import { Size } from '../types';
import { breakpoints } from '../constants/breakpoints';

export const mapSizeToPx = (size: Size): number => {
  return breakpoints[size];
};
