import React from 'react';
import { render } from '@testing-library/react';
import BottomBar from './BottomBar';

describe('BottomBar', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BottomBar />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
