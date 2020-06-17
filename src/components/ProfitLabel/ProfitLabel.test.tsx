import React from 'react';
import { render } from '@testing-library/react';
import ProfitLabel from '.';

describe('ProfitLabel', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ProfitLabel label="Profit" multiplier={0.0453} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
