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
  GoalBackgroundContainer,
} from '../GoalGame.styles';
import { GoalGameStatus } from '../GoalGame.types';
import { Probability } from './Probability';
import { GoalSelection } from './GoalSelection';
import { useKeeperStatus, useShowGame } from '../GoalGame.utils';

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
  isLoading,
}) => {
  const showGame = useShowGame(isLoading);
  const goalKeeperStatus = useKeeperStatus(lastLucky);

  const placeBet = useCallback(
    selection => _placeBet(session?.betId, selection, session?.currentStep),
    [_placeBet, session?.betId, session?.currentStep]
  );
  const direction = useMemo(() => (!animationInProgress ? 'middle' : _direction), [
    _direction,
    animationInProgress,
  ]);
  const showMainBall = useMemo(
    () => !animationInProgress && status === GoalGameStatus.IN_PROGRESS,
    [animationInProgress, status]
  );

  return (
    <>
      <Probability status={status} />
      <GameContainer>
        <StyledGoalBackground>
          {
            <GoalBackgroundContainer>
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
                </GateInnerSection>
              </GateSection>
              {showMainBall ? <StyledGoalMainBall /> : null}
            </GoalBackgroundContainer>
          }
        </StyledGoalBackground>
      </GameContainer>
    </>
  );
};
