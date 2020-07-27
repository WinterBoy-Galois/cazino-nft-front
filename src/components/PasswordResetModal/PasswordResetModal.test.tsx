import React from 'react';
import { render, wait } from '@testing-library/react';

import PasswordResetModal from '.';

describe('PasswordResetModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<PasswordResetModal show loading={false} />);

    wait();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
