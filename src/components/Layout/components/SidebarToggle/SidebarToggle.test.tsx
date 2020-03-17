import React from 'react';
import { render } from '@testing-library/react';
import SidebarToggle from './SidebarToggle';

describe('SidebarToggle', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<SidebarToggle />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
