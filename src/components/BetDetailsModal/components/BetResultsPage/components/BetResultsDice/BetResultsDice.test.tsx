import React from 'react';
import { render } from '@testing-library/react';
import BetResultsDice from '.';

describe('BetResultsDice', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BetResultsDice />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
