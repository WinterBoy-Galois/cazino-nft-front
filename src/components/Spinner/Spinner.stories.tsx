import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '.';

storiesOf('Components/Spinner', module)
  .add('White', () => (
    <div style={{ width: '100px', height: '100px' }}>
      <Spinner color="WHITE" />
    </div>
  ))
  .add('Primary', () => (
    <div style={{ width: '100px', height: '100px' }}>
      <Spinner color="PRIMARY" />
    </div>
  ));
