import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Layout />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
