import React from 'react';
import { render } from '@testing-library/react';

import ErrorSummary from '.';

describe('ErrorSummary', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ErrorSummary message="Your email or password is wrong." />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
