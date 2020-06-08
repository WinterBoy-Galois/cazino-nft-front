import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultDetails from '.';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';

storiesOf('Components/BetDetailsModal/BetResultDetails', module)
  .addDecorator(storyFn => (
    <div style={{ padding: '2rem', backgroundColor: '#2d4560', height: '100vh' }}>{storyFn()}</div>
  ))
  .add('default', () => (
    <BetResultDetails
      details={[
        { label: 'bet', value: <BitcoinValue value={formatBitcoin(0.00001219)} /> },
        { label: 'roll over', value: 25.6 },
        { label: 'win chance', value: '74.4%' },
        {
          label: <ProfitLabel label="Profit" multiplier={0.12} />,
          value: <BitcoinProfit value={0.0004354} />,
        },
      ]}
    />
  ));
