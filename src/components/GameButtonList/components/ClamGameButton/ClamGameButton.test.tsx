import React from 'react';
import { render } from '@testing-library/react';
import ClamGameButton from './ClamGameButton';

describe('ClamGameButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ClamGameButton />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
