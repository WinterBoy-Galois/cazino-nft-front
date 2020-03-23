import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    render(<Footer />);

    // Assert
    // expect(container).toMatchSnapshot();
  });
});
