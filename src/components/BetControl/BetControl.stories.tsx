import React from 'react';
import { text, number, select } from '@storybook/addon-knobs';

import BetControl from '.';

export default {
  title: 'Components/BetControls/BetControl',
  component: BetControl,
};

const data = {
  label: 'Probability',
  value: 31.76,
  min: 0.000001,
  max: 0.1,
};

export const Default = () => (
  <BetControl
    label={text('Label', data.label)}
    value={number('Value', data.value)}
    min={number('Min', data.min)}
    max={number('Max', data.max)}
    icon={select(
      'Icon',
      { Probability: 'PROBABILITY', Multiplier: 'MULTIPLIER', OverUnder: 'OVER_UNDER' },
      'PROBABILITY'
    )}
  />
);
