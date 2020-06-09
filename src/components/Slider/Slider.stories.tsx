import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '.';

storiesOf('Components/Slider', module).add('Default', () => (
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
    <Slider />
  </div>
));
