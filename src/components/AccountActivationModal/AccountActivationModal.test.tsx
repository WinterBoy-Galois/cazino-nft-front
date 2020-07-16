import React from 'react';
import { render } from '@testing-library/react';

import AccountActivationModal from '.';

describe('AccountActivationModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<AccountActivationModal message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
