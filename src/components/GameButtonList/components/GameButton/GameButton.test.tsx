import React from 'react';
import { render } from '@testing-library/react';
import GameButton from './GameButton';

describe('GameButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GameButton game={'CLAM'} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
