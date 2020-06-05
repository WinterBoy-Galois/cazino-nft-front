import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfitLabel from '.';

storiesOf('Components/ProfitLabel', module).add('default', () => (
  <ProfitLabel label="Profit" multiplier={0.0453} />
));
