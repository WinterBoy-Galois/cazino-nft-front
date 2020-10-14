import React from 'react';
import { render } from '@testing-library/react';

import NavLink from '.';

describe('NavLink', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<NavLink to={'/test'}>Test</NavLink>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
