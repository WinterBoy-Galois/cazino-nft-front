import React from 'react';
import { render } from '@testing-library/react';

import Deposits from '.';

describe('Deposits', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Deposits />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
