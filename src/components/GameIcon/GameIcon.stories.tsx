import React from 'react';
import { storiesOf } from '@storybook/react';
import GameIcon from '.';
import { GameTypes } from '../../models/gameTypes.model';

storiesOf('Components/GameIcon', module)
  .add('Clams', () => <GameIcon game={GameTypes.CLAMS} />)
  .add('Goals', () => <GameIcon game={GameTypes.GOALS} />)
  .add('Dice', () => <GameIcon game={GameTypes.DICE} />)
  .add('Mines', () => <GameIcon game={GameTypes.MINES} />);
