import React from 'react';
import { render } from '@testing-library/react';
import BitcoinValue from '.';

describe('BitcoinValue', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BitcoinValue value={'0.2131232'} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
