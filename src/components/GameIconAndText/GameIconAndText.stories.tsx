import React from 'react';
import { storiesOf } from '@storybook/react';
import GameIconAndText from '.';
import { GameTypes } from '../../models/gameTypes.model';

storiesOf('Components/GameIconAndText', module)
  .add('mines', () => <GameIconAndText game={GameTypes.MINES} />)
  .add('dice', () => <GameIconAndText game={GameTypes.DICE} />)
  .add('clams', () => <GameIconAndText game={GameTypes.CLAMS} />)
  .add('goals', () => <GameIconAndText game={GameTypes.GOALS} />);
