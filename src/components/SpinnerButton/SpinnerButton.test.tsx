import React from 'react';
import { render } from '@testing-library/react';
import SpinnerButton from '.';

describe('SpinnerButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<SpinnerButton>Test</SpinnerButton>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
