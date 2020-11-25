import React from 'react';
import { render } from '@testing-library/react';

import BetAmountControl from '.';

describe('BetAmountControl', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BetAmountControl />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
