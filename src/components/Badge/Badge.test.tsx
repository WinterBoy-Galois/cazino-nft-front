import React from 'react';
import { render } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Badge />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
