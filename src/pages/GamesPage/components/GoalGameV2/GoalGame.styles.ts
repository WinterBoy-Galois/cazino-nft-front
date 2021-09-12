import styled, { css } from 'styled-components';
import { mediaMaxWidth, mediaMinWidth } from '../../../../design-system/utils/mediaMaxWidth';
import GoalBackground from '../../../../components/icons/games/GoalBackground';
import GoalMainBall from '../../../../components/icons/games/GoalMainBall';
import { GoalBall } from './components/Ball';

import { Direction, GoalKeeper } from './components/GoalKeeper/GoalKeeper';
import { Props as KeeperProps } from './components/GoalKeeper/GoalKeeper';
import ButtonGroup from '../../../../components/ButtonGroup';
import Spinner from '../../../../components/Spinner';
import { Status as KeeperStatus } from './components/GoalKeeper/GoalKeeper';

export const AmountBlock = styled.div`
  width: calc(50% - 16px);
  max-width: 500px;
  margin: 8px;

  ${mediaMaxWidth(
    'sm',
    css`
      width: 100%;
    `
  )};
`;

export const ControlBlock = styled(AmountBlock)``;

export const ControlsContainer = styled.div`
  justify-content: center;
  width: 100%;
`;

export const GameContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 576px;

  ${mediaMaxWidth(
    'sm',
    css`
      min-height: 150px;
      transform: scale(2.3);
      margin: 72px 0;
    `
  )};

  > * {
    user-select: none;
  }
`;
export const StyledGoalBackground = styled(GoalBackground)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const StyledGoalKeeper = styled(GoalKeeper)<KeeperProps>`
  z-index: 1;
  height: ${({ direction }) => (direction === 'middle' ? 70 : 50)}%;
`;

export const StyledGoalMainBall = styled(GoalMainBall)`
  display: none;
  position: absolute;
  width: 10%;
  left: 45%;
  bottom: -0.5rem;

  ${mediaMinWidth(
    'lg',
    css`
      width: 18%;
      left: 41%;
    `
  )};
  ${mediaMaxWidth(
    'xl',
    css`
      display: block;
    `
  )};
`;

export const GateSection = styled.div`
  width: 30%;
  height: 56%;
  position: absolute;
  z-index: 10;
  top: 10%;
`;

const justifyContent = {
  left: 'flex-start',
  middle: 'center',
  right: 'flex-end',
};

const alignItems = {
  left: 'center',
  middle: 'flex-end',
  right: 'center',
};

export const GateInnerSection = styled.div<{ direction: Direction }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ direction }) => justifyContent[direction]};
  align-items: ${({ direction }) => alignItems[direction]};
`;

export const Ball = styled(GoalBall)`
  cursor: pointer;
`;

export const OuterGateSection = styled.div`
  position: absolute;
  height: 72px;
  width: 35%;
  top: 5%;
`;

export const OuterGateSectionContent = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export const ProbabilityBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 4px;
  height: 64px;
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  max-width: 500px;
  width: 100%;
`;

export const AdvancesBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 285px;
  height: 100%;
  left: 24px;
`;

export const AdvancesInnerBlock = styled.div`
  background: #13223985;
  z-index: 1;
  border-radius: 12px;
  max-height: 100%;
  width: 100%;
  border: 1px solid #283d5d;
  display: flex;
  flex-direction: column-reverse;
`;

export const AdvanceItem = styled.div<{ current: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  & > *:first-child {
    flex: 0 0 65px;
  }
`;

type Status = 'won' | 'lost' | 'unknown' | 'current';
const colorByStatus: { [k in Status]: string } = {
  won: '#73fc7f',
  lost: '#fd7979',
  unknown: '#2d4560',
  current: '#ffe98e',
};

export const Position = styled.div<{ status: Status }>`
  border: 1px solid ${({ status }) => colorByStatus[status]};
  border-radius: 16px;
  min-width: 60px;
  min-height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px;
`;

export const SelectionItem = styled.div<{ selected?: boolean; status: Status }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ selected, status }) => colorByStatus[selected ? status : 'unknown']};
`;

export const StartGameSpinner = styled(Spinner).attrs({
  color: 'WHITE',
})`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

export const EventContainer = styled.div`
  position: absolute;
  left: 0;
  top: -25%;
  width: 100%;
  height: 150%;
  z-index: 10;
  background-color: #113452;
  border: 1px solid #505e6b;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const eventTitleColorMap = (event: KeeperStatus) => {
  switch (event) {
    case 'Won':
      return '#7df380';
    case 'Lost':
      return '#ec7778';
    default:
      return '#c0c9d1';
  }
};

export const EventTitle = styled.div<{ eventStatus: KeeperStatus }>`
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ eventStatus }) => eventTitleColorMap(eventStatus)};
`;

export const EventDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
`;
