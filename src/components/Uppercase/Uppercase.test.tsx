import React from 'react';
import { render } from '@testing-library/react';

import Uppercase from '.';

describe('Uppercase', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Uppercase>test</Uppercase>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
