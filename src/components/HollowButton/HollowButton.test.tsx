import React from 'react';
import { render } from '@testing-library/react';
import HollowButton from '.';

describe('HollowButton', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<HollowButton>Test</HollowButton>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
