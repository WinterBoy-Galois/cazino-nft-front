import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '.';

describe('ToastContainer', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ToastContainer message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
