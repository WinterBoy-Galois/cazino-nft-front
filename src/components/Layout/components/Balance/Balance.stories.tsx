import React from 'react';
import { storiesOf } from '@storybook/react';
import Balance from '.';

storiesOf('Components/BottomBar/Balance', module)
  .add('default', () => <Balance value="0.00000000" />)
  .add('default', () => <Balance value="0.00463242" />);
