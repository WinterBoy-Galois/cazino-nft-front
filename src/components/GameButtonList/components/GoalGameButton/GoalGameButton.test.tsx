import React from 'react';
import { render } from '@testing-library/react';
import GoalGameButton from './GoalGameButton';

describe('GameButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GoalGameButton />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
