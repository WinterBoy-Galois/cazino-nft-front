import React from 'react';
import { render } from '@testing-library/react';

import CheckboxInput from '.';

describe('CheckboxInput', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<CheckboxInput message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
