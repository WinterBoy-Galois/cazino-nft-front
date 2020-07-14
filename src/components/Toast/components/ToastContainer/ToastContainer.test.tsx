import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '.';

describe('ToastContainer', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ToastContainer />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
