import React from 'react';
import { storiesOf } from '@storybook/react';
import DetailList from '.';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';

storiesOf('Components/DetailList', module)
  .addDecorator(storyFn => <div style={{ width: '70%', margin: '0 auto' }}>{storyFn()}</div>)
  .add('default', () => (
    <DetailList
      details={[
        {
          label: 'Total Wager',
          value: <BitcoinValue value={formatBitcoin(0.00003423)} />,
        },
        { label: 'Total Profit', value: <BitcoinValue value={formatBitcoin(0.00000023)} /> },
        { label: 'Most Played', value: 'DICE' },
        { label: 'Total Bets', value: '12' },
        { label: 'Won Bets', value: '8' },
      ]}
    />
  ));
