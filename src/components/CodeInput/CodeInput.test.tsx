import React from 'react';
import { render } from '@testing-library/react';

import CodeInput from '.';

describe('CodeInput', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<CodeInput message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
