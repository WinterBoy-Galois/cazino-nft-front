import React from 'react';
import { storiesOf } from '@storybook/react';
import MinesGameButton from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/GameButtons/MinesGameButton', module).add('Mines', () => (
  <MinesGameButton onClick={action('click')} />
));
