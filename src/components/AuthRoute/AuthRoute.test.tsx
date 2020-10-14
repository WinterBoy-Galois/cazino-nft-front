import React from 'react';
import { render } from '@testing-library/react';

import AuthRoute from '.';

describe('AuthRoute', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<AuthRoute message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
