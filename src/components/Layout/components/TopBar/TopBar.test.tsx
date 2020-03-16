import React from 'react';
import { render } from '@testing-library/react';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<TopBar />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
