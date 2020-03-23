import React from 'react';
import { render } from '@testing-library/react';
import DicesGameButton from './DicesGameButton';

describe('DicesGameButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DicesGameButton />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
