import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';

describe('Menu', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Menu />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
