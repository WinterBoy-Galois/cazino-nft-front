import React, { useMemo } from 'react';
import {
  Container,
  ControlsAdditionalSection,
  GameSection,
  GameSectionInner,
  ControlsSection,
  ExtraInner,
} from './GameSection.styles';
import Spinner from '../../../../components/Spinner';

interface Props {
  additionalData?: React.ReactNode;
  game: React.ReactNode;
  controls: React.ReactNode;
  controlsAdditional?: React.ReactNode;
  isError: boolean;
  isLoading: boolean;
  fullWidth?: boolean;
}

export const GameSectionComponent: React.FC<Props> = ({
  isError,
  isLoading,
  additionalData,
  game,
  controls,
  controlsAdditional,
  fullWidth,
}) => {
  const extraInner = useMemo(
    () =>
      isError || isLoading ? (
        <ExtraInner>
          {isLoading ? <Spinner color="WHITE" /> : 'Something went wrong with game setup'}
        </ExtraInner>
      ) : null,
    [isError, isLoading]
  );

  return (
    <Container>
      <GameSection>
        {extraInner}
        {additionalData}
        <GameSectionInner fullWidth={fullWidth}>{game}</GameSectionInner>
      </GameSection>
      <ControlsSection>
        {controlsAdditional && (
          <ControlsAdditionalSection>{controlsAdditional}</ControlsAdditionalSection>
        )}
        {controls}
      </ControlsSection>
    </Container>
  );
};
