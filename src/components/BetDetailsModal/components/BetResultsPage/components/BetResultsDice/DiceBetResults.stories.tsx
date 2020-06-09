import React from 'react';
import { storiesOf } from '@storybook/react';
import DiceBetResults from '.';

storiesOf('Components/DiceBetResults', module).add('default', () => (
  <DiceBetResults result={58.67} rollOver={60} />
));
