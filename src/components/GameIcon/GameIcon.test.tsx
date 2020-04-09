import React from 'react';
import { render } from '@testing-library/react';
import GameIcon from '.';

describe('GameIcon', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GameIcon game="GOALS" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
