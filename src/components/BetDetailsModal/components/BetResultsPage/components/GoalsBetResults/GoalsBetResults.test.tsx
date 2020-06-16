import React from 'react';
import { render } from '@testing-library/react';
import GoalsBetResults from '.';

describe('GoalsBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GoalsBetResults />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
