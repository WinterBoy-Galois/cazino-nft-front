import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '.';
import { withKnobs, boolean } from '@storybook/addon-knobs';

storiesOf('Components/Slider', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '500px',
        width: '70px',
        margin: '0 auto',
        paddingTop: '30px',
      }}
    >
      {storyFn()}
    </div>
  ))
  .add('default', () => (
    <Slider disabled={boolean('Disabled', false)} switchColors={boolean('Switch colors', false)} />
  ));
