import React from 'react';
import { render } from '@testing-library/react';

import UserMenu from '.';

describe('UserMenu', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<UserMenu username="User" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
