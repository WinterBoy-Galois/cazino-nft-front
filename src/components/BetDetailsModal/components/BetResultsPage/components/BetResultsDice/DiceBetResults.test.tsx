import React from 'react';
import { render } from '@testing-library/react';
import DiceBetResults from '.';

describe('DiceBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DiceBetResults />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
