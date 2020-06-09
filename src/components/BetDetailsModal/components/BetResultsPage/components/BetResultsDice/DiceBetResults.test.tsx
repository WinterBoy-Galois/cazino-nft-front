import React from 'react';
import { render } from '@testing-library/react';
import DiceBetResults from '.';

describe('DiceBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DiceBetResults result={45} rollOver={22} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
