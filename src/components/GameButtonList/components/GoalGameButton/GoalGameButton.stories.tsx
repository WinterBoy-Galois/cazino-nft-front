import React from 'react';
import { storiesOf } from '@storybook/react';
import GoalGameButton from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/GameButtons/GoalGameButton', module).add('Goal', () => (
  <GoalGameButton onClick={action('click')} />
));
