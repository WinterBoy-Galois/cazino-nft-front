import React from 'react';
import { Percentage } from '../../../icons';
import { OverUnder } from '../../../icons';
import { Multiplier } from '../../../icons';
import clsx from 'clsx';

export type IconType = 'PROBABILITY' | 'MULTIPLIER' | 'OVER_UNDER';

interface IProps {
  icon?: IconType;
  className?: string;
}

const Icon: React.FC<IProps> = ({ icon = 'PROBABILITY', className }) => {
  let Component;

  switch (icon) {
    case 'PROBABILITY':
      Component = Percentage;
      break;

    case 'MULTIPLIER':
      Component = Multiplier;
      break;

    case 'OVER_UNDER':
      Component = OverUnder;
      break;

    default:
      throw new Error(`Unknown icon: ${icon}`);
  }

  return <Component className={clsx(className)} />;
};

export default Icon;
