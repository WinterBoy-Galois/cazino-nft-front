import React from 'react';
import { render } from '@testing-library/react';
import MinesGameButton from './MinesGameButton';

describe('MinesGameButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<MinesGameButton />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
