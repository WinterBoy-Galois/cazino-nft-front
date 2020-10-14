import React from 'react';
import { render } from '@testing-library/react';

import AvatarSelector from '.';

describe('AvatarSelector', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<AvatarSelector />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
