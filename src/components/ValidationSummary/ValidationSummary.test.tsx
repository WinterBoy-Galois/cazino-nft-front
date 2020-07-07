import React from 'react';
import { render } from '@testing-library/react';

import ValidationSummary from '.';

describe('ValidationSummary', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ValidationSummary message="Your email or password is wrong." />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
