import React from 'react';
import { render } from '@testing-library/react';
import Teaser from '.';

describe('Teaser', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Teaser />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
