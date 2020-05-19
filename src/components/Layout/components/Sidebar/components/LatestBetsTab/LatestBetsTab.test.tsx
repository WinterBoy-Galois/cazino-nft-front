import React from 'react';
import { render } from '@testing-library/react';
import LatestBetsTab from '.';

describe('LatestBetsTab', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<LatestBetsTab />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
