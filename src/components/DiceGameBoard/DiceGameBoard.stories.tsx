import React from 'react';
import { storiesOf } from '@storybook/react';
import DiceGameBoard from '.';

storiesOf('Components/DiceGameBoard', module).add('default', () => (
  <DiceGameBoard result={55} rollOver={65} />
));
