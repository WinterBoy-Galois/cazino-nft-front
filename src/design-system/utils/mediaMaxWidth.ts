import { css } from 'styled-components';
import { Size } from '../types';
import { mapSizeToPx } from './mapSizeToPx';

export const mediaMinWidth = (size: Size, args: any) => css`
  @media (min-width: ${mapSizeToPx(size)}px) {
    ${css(args)};
  }
`;

export const mediaMaxWidth = (size: Size, args: any) => css`
  @media (max-width: ${mapSizeToPx(size) - 1}px) {
    ${css(args)};
  }
`;
