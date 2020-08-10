import React from 'react';
import { render } from '@testing-library/react';

import Avatar from '.';

describe('Avatar', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Avatar />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
