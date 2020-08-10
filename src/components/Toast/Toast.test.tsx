import React from 'react';
import { render } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Toast />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
