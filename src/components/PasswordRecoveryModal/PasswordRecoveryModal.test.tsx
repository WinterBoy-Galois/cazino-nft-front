import React from 'react';
import { render, waitFor } from '@testing-library/react';

import PasswordRecoveryModal from '.';

describe('PasswordRecoveryModal', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<PasswordRecoveryModal show loading={false} />);

    // Assert
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
