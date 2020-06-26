import React from 'react';
import { storiesOf } from '@storybook/react';
import GameButton from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/GameButtons/GoalGameButton', module).add('Goal', () => (
  <GameButton headline="goal" onClick={action('click')} />
));
