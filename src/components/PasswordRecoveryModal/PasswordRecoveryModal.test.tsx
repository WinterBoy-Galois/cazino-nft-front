import React from 'react';
import { render, wait } from '@testing-library/react';

import PasswordRecoveryModal from '.';

describe('PasswordRecoveryModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<PasswordRecoveryModal show loading={false} />);

    wait();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
