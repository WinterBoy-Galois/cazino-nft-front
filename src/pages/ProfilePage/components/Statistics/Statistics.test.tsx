import React from 'react';
import { render } from '@testing-library/react';

import Statistics from '.';

describe('Statistics', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Statistics message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
