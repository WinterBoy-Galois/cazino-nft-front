import React from 'react';
import { render } from '@testing-library/react';
import BetResultDetails from '.';

describe('BetResultDetails', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BetResultDetails />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
