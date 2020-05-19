import React from 'react';
import { render, wait, act } from '@testing-library/react';

import MyBetsTab from '.';

describe('MyBetsTab', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<MyBetsTab />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
