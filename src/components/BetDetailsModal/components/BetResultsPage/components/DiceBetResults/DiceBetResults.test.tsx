import React from 'react';
import { render } from '@testing-library/react';
import DiceBetResults from '.';

describe('DiceBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DiceBetResults result={45} target={50} over={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
