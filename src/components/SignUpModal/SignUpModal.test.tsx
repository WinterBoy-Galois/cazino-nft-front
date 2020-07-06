import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import SignUpModal from './SignUpModal';

describe('SignUpModal', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<SignUpModal show={true} loading={false} />);

    await waitForDomChange();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
