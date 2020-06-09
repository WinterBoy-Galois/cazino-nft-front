import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '.';

storiesOf('Components/Slider', module)
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
  .add('default', () => <Slider />)
  .add('disabled', () => <Slider disabled value={34.67} />);
