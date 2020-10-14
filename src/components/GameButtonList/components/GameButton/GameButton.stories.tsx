import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import GameButton from '.';

export default {
  title: 'Components/GameButtons/GameButton',
  component: GameButton,
};

export const Custom = () => (
  <GameButton headline={text('Headline', 'Game Name')} onClick={action('click')} />
);
