import React from 'react';
import { render } from '@testing-library/react';
import SecondaryButton from '.';

describe('SecondaryButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<SecondaryButton>Test</SecondaryButton>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
