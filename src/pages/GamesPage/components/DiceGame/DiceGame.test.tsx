import React from 'react';
import { render } from '@testing-library/react';

import DiceGame from '.';

describe('DiceGame', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DiceGame message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
