import React from 'react';
import { render } from '@testing-library/react';
import Link from '.';

describe('Button', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Link>Test</Link>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
