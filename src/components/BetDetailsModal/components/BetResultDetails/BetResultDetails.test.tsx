import React from 'react';
import { render } from '@testing-library/react';
import BetResultDetails from '.';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';

describe('BetResultDetails', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
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
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
