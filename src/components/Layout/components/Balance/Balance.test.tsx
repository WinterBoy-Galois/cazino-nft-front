import React from 'react';
import { render } from '@testing-library/react';
import Balance from './Balance';

describe('Balance', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Balance />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
