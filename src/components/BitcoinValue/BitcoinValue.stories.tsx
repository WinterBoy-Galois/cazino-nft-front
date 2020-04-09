import React from 'react';
import { storiesOf } from '@storybook/react';
import BitcoinValue from './BitcoinValue';

storiesOf('Components/BitcoinValue', module).add('default', () => (
  <BitcoinValue value={'0.234234234'} />
));
