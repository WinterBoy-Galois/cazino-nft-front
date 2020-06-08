import React from 'react';
import { render } from '@testing-library/react';
import DiceGameBoard from '.';

describe('DiceGameBoard', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DiceGameBoard />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
