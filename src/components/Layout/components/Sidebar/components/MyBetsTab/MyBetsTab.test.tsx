import React from 'react';
import { render, wait, act } from '@testing-library/react';
import MyBetsTab from '.';

describe('MyBetsTab', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<MyBetsTab />);

    await act(wait);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
