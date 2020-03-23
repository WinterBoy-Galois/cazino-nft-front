import React from 'react';
import { render } from '@testing-library/react';
import SideBar from './SideBar';

describe('SideBar', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<SideBar />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
