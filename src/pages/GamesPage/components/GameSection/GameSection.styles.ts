import styled, { css } from 'styled-components';
import { mediaMaxWidth } from '../../../../design-system/utils/mediaMaxWidth';

export const Container = styled.div``;
export const GameSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 2rem;
  position: relative;
`;

export const GameSectionInner = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
`;

export const ExtraInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #091b32d9;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  span {
    width: 64px;
    height: 64px;
  }
`;

export const ControlBlock = styled.div``;

export const ControlsAdditionalSection = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  transform: translateY(-50%);

  & > * {
    margin: 0 12px;
  }

  ${mediaMaxWidth(
    'xxl',
    css`
      left: 0;
    `
  )};
`;

export const ControlsSection = styled.div`
  background-color: #13223a;
  padding: 3.5rem 1rem;
  display: flex;
  position: relative;
  justify-content: center;

  ${mediaMaxWidth(
    'xxl',
    css`
      padding: 1.5rem 1rem;
    `
  )};
`;
