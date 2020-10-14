import React from 'react';
import { render, waitFor } from '@testing-library/react';

import PasswordResetModal from '.';

describe('PasswordResetModal', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<PasswordResetModal show loading={false} />);

    // Assert
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
