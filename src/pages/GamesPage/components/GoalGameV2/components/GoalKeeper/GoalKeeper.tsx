import React, { useMemo } from 'react';
import GoalKeeperLostLeft from '../../../../../../components/icons/games/GoalKeeper/GoalKeeperLostLeft';
import GoalKeeperLostMiddle from '../../../../../../components/icons/games/GoalKeeper/GoalKeeperLostMiddle';
import GoalKeeperLostRight from '../../../../../../components/icons/games/GoalKeeper/GoalKeeperLostRight';
import GoalKeeperWonLeft from '../../../../../../components/icons/games/GoalKeeper/GoalKeeperWonLeft';
import GoalKeeperWonRight from '../../../../../../components/icons/games/GoalKeeper/GoalKeeperWonRight';
import GoalKeeperIdle from '../../../../../../components/icons/games/GoalKeeper/GoalKeeperIdle';
import { GoalKeeperWonMiddle } from './GoalKeeperWonMiddle';

export type Status = 'Won' | 'Lost' | null;
export type Direction = 'left' | 'middle' | 'right';
type ComponentListType = { [k in Direction]: React.FC };
export interface Props {
  status: Status;
  direction: Direction;
  className?: string;
}

const WonComponent: ComponentListType = {
  left: GoalKeeperWonLeft,
  middle: GoalKeeperWonMiddle,
  right: GoalKeeperWonRight,
};

const LostComponent: ComponentListType = {
  left: GoalKeeperLostLeft,
  middle: GoalKeeperLostMiddle,
  right: GoalKeeperLostRight,
};

export const GoalKeeper: React.FC<Props> = ({ className, direction, status }) => {
  const Component = useMemo(
    () =>
      status === 'Won'
        ? WonComponent[direction]
        : status === 'Lost'
        ? LostComponent[direction]
        : GoalKeeperIdle,
    [status, direction]
  );

  return <Component className={className} />;
};
