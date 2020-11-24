import React from 'react';
import { Percentage } from '../../../icons';
import { OverUnder } from '../../../icons';
import { Multiplier } from '../../../icons';
import clsx from 'clsx';
import Bitcoin from '../../../icons/social/Bitcoin';
import styles from './Icon.module.scss';

export type IconType = 'PROBABILITY' | 'MULTIPLIER' | 'OVER_UNDER' | 'BITCOIN';

interface IProps {
  icon?: IconType;
}

const Icon: React.FC<IProps> = ({ icon = 'PROBABILITY' }) => {
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

    case 'BITCOIN':
      Component = Bitcoin;
      break;

    default:
      throw new Error(`Unknown icon: ${icon}`);
  }

  return <Component className={clsx(styles.icon, icon === 'BITCOIN' && styles.icon__bitcoin)} />;
};

export default Icon;
