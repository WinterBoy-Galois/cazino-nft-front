import React from 'react';
import { render } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Carousel />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
