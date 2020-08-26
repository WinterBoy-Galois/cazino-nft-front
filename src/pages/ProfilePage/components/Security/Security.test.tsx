import React from 'react';
import { render, wait } from '@testing-library/react';
import Security from '.';

describe('Statistics', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Security loading={false} />);

    wait();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
