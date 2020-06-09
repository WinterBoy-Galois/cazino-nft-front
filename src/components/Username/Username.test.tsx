import React from 'react';
import { render } from '@testing-library/react';
import Username from '.';

describe('Username', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Username username="test" avatarUrl="testurl" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
