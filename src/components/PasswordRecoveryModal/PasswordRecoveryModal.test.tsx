import React from 'react';
import { render } from '@testing-library/react';

import PasswordRecoveryModal from '.';

describe('PasswordRecoveryModal', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<PasswordRecoveryModal show loading={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
