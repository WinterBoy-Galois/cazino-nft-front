import React from 'react';
import { render } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Button>Test</Button>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
