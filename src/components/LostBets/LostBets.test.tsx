import React from 'react';
import { render } from '@testing-library/react';
import LostBets from '.';

describe('LostBets', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<LostBets totalBets={10} luckyBets={5} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
