import React from 'react';
import { storiesOf } from '@storybook/react';
import GameIcon from '.';

storiesOf('Components/GameIcon', module)
  .add('Clams', () => <GameIcon game="CLAMS" />)
  .add('Goals', () => <GameIcon game="GOALS" />)
  .add('Dice', () => <GameIcon game="DICE" />)
  .add('Mines', () => <GameIcon game="MINES" />);
