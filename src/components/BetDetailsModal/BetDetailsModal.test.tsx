import React from 'react';
import { render } from '@testing-library/react';
import BetDetailsModal from '.';

describe('BetDetailsModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<BetDetailsModal show={true} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
