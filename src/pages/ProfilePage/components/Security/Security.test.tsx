import React from 'react';
import { render } from '@testing-library/react';
import Security from '.';

describe('Statistics', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<Security loading={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
