import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '.';

storiesOf('Components/Slider', module).add('Default', () => (
  <div style={{ display: 'flex', justifyContent: 'center', height: '500px' }}>
    <Slider />
  </div>
));
