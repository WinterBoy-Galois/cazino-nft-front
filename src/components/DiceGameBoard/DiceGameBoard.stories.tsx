import React from 'react';
import { storiesOf } from '@storybook/react';
import DiceGameBoard from '.';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import { DiceGameState } from '../../models/diceGameState.model';

storiesOf('Components/DiceGameBoard', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <div style={{ padding: '1rem 2rem' }}>{storyFn()}</div>)
  .add('default', () => (
    <DiceGameBoard
      result={number('Result', 55)}
      target={number('Target', 65)}
      disabled={boolean('Disabled', false)}
      over={boolean('Over', false)}
      gameState={select(
        'GameState',
        {
          IDLE: DiceGameState.IDLE,
          WON: DiceGameState.WON,
          LOST: DiceGameState.LOST,
          HITTING: DiceGameState.HITTING,
        },
        DiceGameState.IDLE
      )}
    />
  ));
