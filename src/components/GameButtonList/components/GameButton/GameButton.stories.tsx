import React from 'react';
import { storiesOf } from '@storybook/react';
import GameButton from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/GameButtons/GameButton', module)
  .add('Goal', () => <GameButton game="GOAL" onClick={action('click')} />)
  .add('Mines', () => <GameButton game="MINES" onClick={action('click')} />)
  .add('Clam', () => <GameButton game="CLAM" onClick={action('click')} />)
  .add('Dices', () => <GameButton game="DICES" onClick={action('click')} />);
