import styled, { css } from 'styled-components';
import { ControlBlock } from '../GameSection/GameSection.styles';
import { mediaMaxWidth } from '../../../../design-system/utils/mediaMaxWidth';
import { Character } from './components/Character';
import { DiceGameStatus } from './DiceGame.types';

export const AmountBlock = styled(ControlBlock)`
  ${mediaMaxWidth(
    'xxl',
    css`
      margin: 0.5rem 0;
    `
  )};
`;

export const SliderSection = styled.div`
  height: 72.6%;
  position: absolute;
  top: 7.8%;
  right: 0;
  width: 20.7%;
`;

export const StyledCharacter = styled(Character)`
  position: absolute;
  left: -9%;
  bottom: 0;
  width: 48%;

  ${({ gameState }) => {
    return (
      gameState === DiceGameStatus.HITTING &&
      css`
        left: -7.7%;
        bottom: 2.4%;
        width: 70%;
      `
    );
  }};
`;
