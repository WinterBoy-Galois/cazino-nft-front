import React from 'react';
import { storiesOf } from '@storybook/react';
import DiceGameBoard from '.';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

storiesOf('Components/DiceGameBoard', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <div style={{ padding: '1rem 2rem' }}>{storyFn()}</div>)
  .add('default', () => (
    <DiceGameBoard
      result={number('Result', 55)}
      target={number('Target', 65)}
      disabled={boolean('Disabled', false)}
      over={boolean('Over', false)}
    />
  ));
