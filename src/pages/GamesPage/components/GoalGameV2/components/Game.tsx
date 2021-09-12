import React, { useCallback, useMemo } from 'react';
import {
  GameContainer,
  GateInnerSection,
  GateSection,
  OuterGateSection,
  OuterGateSectionContent,
  StyledGoalBackground,
  StyledGoalKeeper,
  StyledGoalMainBall,
} from '../GoalGame.styles';
import { GoalGameStatus } from '../GoalGame.types';
import { Probability } from './Probability';
import { GoalSelection } from './GoalSelection';
import { useKeeperStatus } from '../GoalGame.utils';

export const Game: React.FC<any> = ({
  allowNext,
  lastSpot,
  direction: _direction = 'middle',
  status = GoalGameStatus.IDLE,
  ballAmount,
  session,
  placeBet: _placeBet,
  animationInProgress = false,
  lastLucky = false,
}) => {
  const goalKeeperStatus = useKeeperStatus(lastLucky);

  const placeBet = useCallback(
    selection => _placeBet(session?.betId, selection, session?.currentStep),
    [_placeBet, session?.betId, session?.currentStep]
  );
  const direction = useMemo(() => (!animationInProgress ? 'middle' : _direction), [
    _direction,
    animationInProgress,
  ]);
  console.log(direction, _direction, animationInProgress);

  return (
    <>
      <Probability status={status} />
      <GameContainer>
        <StyledGoalBackground />
        <OuterGateSection>
          <OuterGateSectionContent>
            {status === GoalGameStatus.IN_PROGRESS && (
              <GoalSelection ballAmount={ballAmount} placeBet={placeBet} />
            )}
          </OuterGateSectionContent>
        </OuterGateSection>
        <GateSection>
          <GateInnerSection direction={direction}>
            <StyledGoalKeeper direction={direction} status={goalKeeperStatus} />

            {allowNext && lastSpot === null ? <StyledGoalMainBall /> : null}
          </GateInnerSection>
        </GateSection>
      </GameContainer>
    </>
  );
};
