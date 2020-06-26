import React from 'react';
import { render } from '@testing-library/react';
import BitcoinProfit from '.';

describe('BitcoinProfit', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BitcoinProfit value={0.0012323} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
