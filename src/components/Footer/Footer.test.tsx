import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  xit('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Footer />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
