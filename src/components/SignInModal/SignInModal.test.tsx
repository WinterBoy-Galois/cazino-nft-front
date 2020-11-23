import React from 'react';
import { render } from '@testing-library/react';
import SignInModal from './SignInModal';

describe('SignInModal', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<SignInModal show={true} loading={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
