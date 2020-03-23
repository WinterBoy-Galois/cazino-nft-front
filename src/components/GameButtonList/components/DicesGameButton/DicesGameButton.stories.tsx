import React from 'react';
import { storiesOf } from '@storybook/react';
import DicesGameButton from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/GameButtons/DicesGameButton', module).add('Mines', () => (
  <DicesGameButton onClick={action('click')} />
));
