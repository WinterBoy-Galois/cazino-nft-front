import React from 'react';
import { storiesOf } from '@storybook/react';
import BitcoinProfit from '.';

storiesOf('Components/BitcoinProfit', module)
  .add('default', () => <BitcoinProfit value={0} />)
  .add('postitive', () => <BitcoinProfit value={0.0012323} />)
  .add('negative', () => <BitcoinProfit value={-0.00324} />);
