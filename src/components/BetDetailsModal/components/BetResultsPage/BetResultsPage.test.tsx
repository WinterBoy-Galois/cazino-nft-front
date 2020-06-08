import React from 'react';
import { render } from '@testing-library/react';
import BetDetailsPage from '.';

describe('BetDetailsPage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BetDetailsPage />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
