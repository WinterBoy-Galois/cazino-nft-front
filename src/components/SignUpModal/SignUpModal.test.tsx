import React from 'react';
import { render } from '@testing-library/react';
import SignUpModal from './SignUpModal';

describe('SignUpModal', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<SignUpModal show={true} loading={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
