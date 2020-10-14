import React from 'react';
import { render } from '@testing-library/react';

import SwitchInput from '.';

describe('SwitchInput', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<SwitchInput message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
