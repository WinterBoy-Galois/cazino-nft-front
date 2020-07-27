import React from 'react';
import { render } from '@testing-library/react';

import PasswordResetModal from '.';

describe('PasswordResetModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<PasswordResetModal message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
